import { prisma } from '../database/prisma'

interface CreateNoteTodoServiceParams {
	noteId: string
	text: string
	checked?: boolean
}

export class CreateNoteTodoService {
	async execute({ noteId, text, checked }: CreateNoteTodoServiceParams) {
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
