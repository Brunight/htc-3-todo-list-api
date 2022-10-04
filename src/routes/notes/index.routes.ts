import { Router } from 'express'
import { prisma } from '../../database/prisma'
import { noteTodosRouter } from './noteTodos.routes'

export const notesRouter = Router({ mergeParams: true })

notesRouter.get('/', async (request, response) => {
	const notes = await prisma.note.findMany({
		include: {
			todos: true
		}
	})

	response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
	const { id } = request.params

	const item = await prisma.note.findFirst({
		where: {
			id
		},
		include: {
			todos: true
		}
	})

	if (!item) {
		return response
			.status(404)
			.json({ error: true, message: 'Item not found.' })
	}

	response.json(item)
})

notesRouter.post('/', async (request, response) => {
	const { title, text, todos } = request.body

	const note = await prisma.note.create({
		data: {
			title,
			text,
			todos: {
				create: todos
			}
		},
		include: {
			todos: true
		}
	})

	response.status(201).json(note)
})

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
