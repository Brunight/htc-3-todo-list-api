import { prisma } from '../database/prisma'
import { AppError } from '../errors/AppError'

interface Todo {
  text: string
  checked?: boolean
}

interface CreateNoteServiceParams {
	title: string
	text?: string
	todos?: Todo[]
  userId: string
}

export class CreateNoteService {
	async execute({ title, text, todos, userId }: CreateNoteServiceParams) {
    const parsedTodos = todos?.map((todo) => ({ ...todo, checked: !!todo.checked }))

    if (!title) {
      throw new AppError('Missing title')
    }

		const note = await prisma.note.create({
			data: {
				title,
				text,
				userId,
				todos: {
					create: parsedTodos
				}
			},
			include: {
				todos: true
			}
		})

    return note
	}
}
