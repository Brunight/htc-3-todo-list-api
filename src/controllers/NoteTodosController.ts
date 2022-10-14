import { Request, Response } from 'express'
import { CreateNoteTodoService } from '../services/CreateNoteTodoService'

export class NoteTodosController {
	async create(request: Request, response: Response): Promise<Response> {
		const { noteId } = request.params

		const { text, checked } = request.body

		const createNoteTodo = new CreateNoteTodoService()

		const todo = await createNoteTodo.execute({ noteId, text, checked })

		return response.status(201).json(todo)
	}
}
