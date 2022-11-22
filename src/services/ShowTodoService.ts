import { prisma } from '../database/prisma'
import { AppError } from '../errors/AppError'

type ShowTodoServiceParams = {
	id: string
	userId: string
}

export class ShowTodoService {
	async execute({ id, userId }: ShowTodoServiceParams) {
		const todo = await prisma.todo.findFirst({
			where: {
				id
			},
			include: {
				Note: true
			}
		})

    if (!todo) {
      throw new AppError('Todo not found.', 404)
    }

		if (todo.Note?.userId !== userId) {
			throw new AppError("You can't edit a note from another user.", 403)
		}

		return todo
	}
}
