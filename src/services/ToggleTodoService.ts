import { prisma } from '../database/prisma'
import { AppError } from '../errors/AppError'

interface ToggleTodoServiceParams {
	id: string
}

export class ToggleTodoService {
	async execute({ id }: ToggleTodoServiceParams) {
		const todo = await prisma.todo.findFirst({
			where: {
				id
			}
		})

		if (!todo) {
			throw new AppError('Todo not found.', 404)
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
