import { Router } from 'express'
import { TodosController } from '../controllers/TodosController'

export const todosRouter = Router()

const todosController = new TodosController()

todosRouter.get('/:id', todosController.show)

todosRouter.patch('/:id/toggle', todosController.update)
