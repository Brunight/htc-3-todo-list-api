import { prisma } from '../database/prisma'
import { AppError } from '../errors/AppError'

interface CreateNoteTodoServiceParams {
	noteId: string
	text: string
	checked?: boolean
	userId: string
}

export class CreateNoteTodoService {
	async execute({
		noteId,
		text,
		checked,
		userId
	}: CreateNoteTodoServiceParams) {
		const note = await prisma.note.findFirst({
			where: {
				id: noteId
			}
		})

		if (!note) {
			throw new AppError('Note not found.', 404)
		}

		if (note.userId !== userId) {
			throw new AppError("You can't edit a note from another user.", 403)
		}

		const todo = await prisma.todo.create({
			data: {
				checked: !!checked,
				text,
				noteId
			}
		})

		return todo
	}
}
