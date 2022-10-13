import { Router } from 'express'
import { NotesController } from '../../controllers/NotesController'
import { noteTodosRouter } from './noteTodos.routes'

export const notesRouter = Router({ mergeParams: true })

const notesController = new NotesController()

notesRouter.get('/', notesController.index)

notesRouter.get('/:id', notesController.show)

notesRouter.post('/', notesController.create)

notesRouter.put('/:id', notesController.update)

notesRouter.delete('/:id', notesController.delete)

notesRouter.use('/:noteId/todos', noteTodosRouter)
