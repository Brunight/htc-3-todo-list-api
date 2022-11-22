import { prisma } from '../database/prisma'
import { AppError } from '../errors/AppError'

type DeleteNoteServiceParams = {
	id: string
	userId: string
}

export class DeleteNoteService {
	async execute({ id, userId }: DeleteNoteServiceParams) {
		const note = await prisma.note.findFirst({
			where: { id }
		})

		if (!note) {
			throw new AppError('Note not found.', 404)
		}

		if (note.userId !== userId) {
			throw new AppError("You can't delete a note from another user.", 403)
		}

		await prisma.note.delete({
			where: {
				id
			}
		})
	}
}
