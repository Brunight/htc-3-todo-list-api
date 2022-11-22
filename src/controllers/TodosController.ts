import { Request, Response } from 'express'
import { ShowTodoService } from '../services/ShowTodoService'
import { ToggleTodoService } from '../services/ToggleTodoService'

export class TodosController {
	async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const userId = request.user.id

		const showTodo = new ShowTodoService()

		const todo = await showTodo.execute({ id, userId })

		return response.json(todo)
	}

	async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const userId = request.user.id

		const toggleTodo = new ToggleTodoService()

		const todo = await toggleTodo.execute({ id, userId })

		return response.json(todo)
	}
}
