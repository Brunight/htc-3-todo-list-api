import { prisma } from '../database/prisma'
import { AppError } from '../errors/AppError'

type ShowNoteServiceParams = {
	id: string
}

export class ShowNoteService {
	async execute({ id }: ShowNoteServiceParams) {
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

		return note
	}
}
