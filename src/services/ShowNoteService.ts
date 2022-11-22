import { prisma } from '../database/prisma'
import { AppError } from '../errors/AppError'

type ShowNoteServiceParams = {
	id: string
	userId: string
}

export class ShowNoteService {
	async execute({ id, userId }: ShowNoteServiceParams) {
		const note = await prisma.note.findFirst({
			where: {
				id
			},
			include: {
				todos: true
			}
		})

    if (!note) {
      throw new AppError('Note not found.', 404)
    }

		if (note.userId !== userId) {
      throw new AppError("You can't see a note from another user.", 403)
		}

		return note
	}
}
