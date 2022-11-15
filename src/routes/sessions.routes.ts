import { Router } from 'express'
import { SessionsController } from '../controllers/SessionsController'
import { createSessionSchema } from '../dtos/createSession.schema'
import { validateSchema } from '../middlewares/validateSchema'

export const sessionsRouter = Router()

const sessionsController = new SessionsController()

sessionsRouter.post(
	'/',
	validateSchema(createSessionSchema),
	sessionsController.create
)
