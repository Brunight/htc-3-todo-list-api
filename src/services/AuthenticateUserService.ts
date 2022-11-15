import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import auth from '../config/auth'

import { prisma } from '../database/prisma'
import { AppError } from '../errors/AppError'

interface AuthenticateUserServiceParams {
	email: string
	password: string
}

export class AuthenticateUserService {
	async execute({ email, password }: AuthenticateUserServiceParams) {
		const user = await prisma.user.findFirst({
			where: {
				email
			}
		})

		if (!user) {
			throw new AppError('Incorrect email/password combination.')
		}

		const passwordMatched = await compare(password, user.password)

		if (!passwordMatched) {
			throw new AppError('Incorrect email/password combination.')
		}

		const { password: _, ...userData } = user

		const {
			jwt: { secret, expiresIn }
		} = auth

		const token = sign({}, secret, {
			subject: user.id,
			expiresIn
		})

		return { user: userData, token }
	}
}
