import { Request, Response } from 'express'

export class TodosController {
	async show(request: Request, response: Response): Promise<Response> {
    // TODO GET

		return response.json({})
	}

	async update(request: Request, response: Response): Promise<Response> {
    // TODO PATCH

		return response.json({})
	}
}
