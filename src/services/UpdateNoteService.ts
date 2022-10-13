import { prisma } from '../database/prisma'
import { AppError } from '../errors/AppError'

type DeleteNoteServiceParams = {
	id: string
	text: string
	title: string
}

export class UpdateNoteService {
	async execute({ id, text, title }: DeleteNoteServiceParams) {
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

			return item
		} catch {
			throw new AppError('Note not found.', 404)
		}
	}
}
