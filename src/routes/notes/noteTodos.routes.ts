import { Router } from 'express'
import { prisma } from '../../database/prisma'

type PostRequestParams = {
	noteId: string
}

export const noteTodosRouter = Router({ mergeParams: true })

noteTodosRouter.post('/', async (request, response) => {
	const { noteId } = request.params as PostRequestParams

	const { text, checked } = request.body

	if (!text) {
		return response.status(400).json({ error: true, message: 'Missing text' })
	}

	const todo = await prisma.todo.create({
		data: {
			checked: !!checked,
			text,
			noteId
		}
	})

	return response.status(201).json(todo)
})
