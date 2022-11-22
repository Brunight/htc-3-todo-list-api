import { prisma } from '../database/prisma'
import { AppError } from '../errors/AppError'

type DeleteNoteServiceParams = {
	id: string
	text: string
	title: string
	userId: string
}

export class UpdateNoteService {
	async execute({ id, text, title, userId }: DeleteNoteServiceParams) {
		const note = await prisma.note.findFirst({
			where: {
				id
			}
		})

		if (!note) {
			throw new AppError('Note not found.', 404)
		}

		if (note.userId !== userId) {
			throw new AppError("You can't edit a note from another user.", 403)
		}

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

		return item
	}
}
