import { prisma } from '../database/prisma'
import { AppError } from '../errors/AppError'

interface ShowProfileServiceParams {
	userId: string
}

export class ShowProfileService {
	async execute({ userId }: ShowProfileServiceParams) {
		const findUser = await prisma.user.findFirst({ where: { id: userId } })

		if (!findUser) {
			throw new AppError('User not found.')
		}

    const { password, ...user } = findUser

		return user
	}
}
