import { prisma } from '../database/prisma'
import { AppError } from '../errors/AppError'

type ShowTodoServiceParams = {
	id: string
}

export class ShowTodoService {
	async execute({ id }: ShowTodoServiceParams) {
		const todo = await prisma.todo.findFirst({
			where: {
				id
			}
		})

    if (!todo) {
      throw new AppError('Todo not found.', 404)
    }

		return todo
	}
}
