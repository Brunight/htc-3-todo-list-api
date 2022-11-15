import { Router } from 'express'
import { TodosController } from '../controllers/TodosController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export const todosRouter = Router()

const todosController = new TodosController()

todosRouter.use(ensureAuthenticated)

todosRouter.get('/:id', todosController.show)

todosRouter.patch('/:id/toggle', todosController.update)
