import { Router } from 'express'
import { prisma } from '../database/prisma'

export const todosRouter = Router()

todosRouter.get('/:id', async (request, response) => {
	const { id } = request.params

	const todo = await prisma.todo.findFirst({
		where: {
			id
		}
	})

	if (!todo) {
		return response
			.status(404)
			.json({ error: true, message: 'Todo not found.' })
	}

	response.json(todo)
})

todosRouter.patch('/:id/toggle', async (request, response) => {
	const { id } = request.params

	const todo = await prisma.todo.findFirst({
		where: {
			id
		}
	})

	if (!todo) {
		return response
			.status(404)
			.json({ error: true, message: 'Todo not found.' })
	}

	const updatedTodo = await prisma.todo.update({
		where: {
			id
		},
		data: {
			checked: !todo.checked
		}
	})

	response.json(updatedTodo)
})
