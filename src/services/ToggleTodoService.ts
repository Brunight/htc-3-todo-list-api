import { prisma } from '../database/prisma'
import { AppError } from '../errors/AppError'

interface ToggleTodoServiceParams {
	id: string
	userId: string
}

export class ToggleTodoService {
	async execute({ id, userId }: ToggleTodoServiceParams) {
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

		const updatedTodo = await prisma.todo.update({
			where: {
				id
			},
			data: {
				checked: !todo.checked
			}
		})

		return updatedTodo
	}
}
