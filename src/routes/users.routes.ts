import { Router } from 'express'
import { UsersController } from '../controllers/UsersController'
import { createUserSchema } from '../dtos/createUser.schema'
import { validateSchema } from '../middlewares/validateSchema'

export const usersRouter = Router()

const usersController = new UsersController()

usersRouter.post('/', validateSchema(createUserSchema), usersController.create)
