import { hash } from 'bcryptjs'

import { prisma } from '../database/prisma'
import { AppError } from '../errors/AppError'

interface CreateUserServiceParams {
	name: string
	email: string
	password: string
}

// JWT
// JSON Web Token

export class CreateUserService {
	async execute({ email, name, password }: CreateUserServiceParams) {
		const checkUserExists = await prisma.user.findFirst({
			where: {
				email
			}
		})

		if (checkUserExists) {
			throw new AppError('E-mail address already used.')
		}

		const hashedPassword = await hash(password, 8)

		const { password: _, ...user } = await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword
			}
		})

		return user
	}
}
