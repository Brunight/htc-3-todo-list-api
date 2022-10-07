import { Router } from 'express'
import { NotesController } from '../../controllers/NotesController'
import { prisma } from '../../database/prisma'
import { noteTodosRouter } from './noteTodos.routes'

export const notesRouter = Router({ mergeParams: true })

const notesController = new NotesController()

notesRouter.get('/', notesController.index)

notesRouter.get('/:id', notesController.show)

notesRouter.post('/', notesController.create)

notesRouter.put('/:id', async (request, response) => {
	const { id } = request.params
	const { text, title } = request.body

	try {
		const item = await prisma.note.update({
			where: {
				id
			},
			data: {
				text,
				title
			},
			include: {
				todos: true
			}
		})

		return response.status(201).json(item)
	} catch {
		return response
			.status(404)
			.json({ error: true, message: 'Note not found.' })
	}
})

notesRouter.delete('/:id', async (request, response) => {
	const { id } = request.params

	try {
		await prisma.note.delete({
			where: {
				id
			}
		})
	} catch {
		return response
			.status(404)
			.json({ error: true, message: 'Note not found.' })
	}

	response.send()
})

notesRouter.use('/:noteId/todos', noteTodosRouter)
