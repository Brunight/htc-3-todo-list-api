import { Router } from 'express'
import { prisma } from '../../database/prisma'

type PostRequestParams = {
	noteId: string
}

export const noteTodosRouter = Router({ mergeParams: true })

noteTodosRouter.post('/', async (request, response) => {
	const { noteId } = request.params as PostRequestParams

	const { text, checked, todos } = request.body

	if (text) {
		const todo = await prisma.todo.create({
			data: {
				checked: !!checked,
				text,
				noteId
			}
		})

		return response.status(201).json(todo)
	}

	if (todos && Array.isArray(todos)) {
		const createdTodos: any[] = []

		for (const todo of todos) {
			const createdTodo = await prisma.todo.create({
				data: {
					...todo,
					checked: !!todo.checked,
					noteId
				}
			})

			createdTodos.push(createdTodo)
		}

		return response.json(createdTodos)
	}
})
