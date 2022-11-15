import { Request, Response } from 'express'
import { AuthenticateUserService } from '../services/AuthenticateUserService'

export class SessionsController {
	async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticateUser = new AuthenticateUserService()

    const user = await authenticateUser.execute({ email, password })

    return response.json(user)
  }
}
