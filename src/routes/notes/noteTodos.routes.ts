import { Router } from 'express'
import { NoteTodosController } from '../../controllers/NoteTodosController'
import * as Yup from 'yup'
import { validateSchema } from '../../middlewares/validateSchema'
import { createNoteTodoSchema } from '../../dtos/createNoteTodo.schema'

export const noteTodosRouter = Router({ mergeParams: true })

const noteTodosController = new NoteTodosController()

noteTodosRouter.post(
	'/',
	validateSchema(createNoteTodoSchema),
	noteTodosController.create
)
