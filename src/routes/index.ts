import { Router } from 'express'
import { notesRouter } from './notes/index.routes'
import { todosRouter } from './todos.routes'

export const routes = Router()

routes.use('/notes', notesRouter)

routes.use('/todos', todosRouter)
