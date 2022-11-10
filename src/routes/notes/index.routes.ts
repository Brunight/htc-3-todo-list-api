import { Router } from 'express'
import { NotesController } from '../../controllers/NotesController'
import { createNoteSchema } from '../../dtos/createNote.schema'
import { updateNoteSchema } from '../../dtos/updateNote.schema'
import { validateSchema } from '../../middlewares/validateSchema'
import { noteTodosRouter } from './noteTodos.routes'

export const notesRouter = Router({ mergeParams: true })

const notesController = new NotesController()

notesRouter.get('/', notesController.index)

notesRouter.get('/:id', notesController.show)

notesRouter.post('/', validateSchema(createNoteSchema), notesController.create)

notesRouter.put(
	'/:id',
	validateSchema(updateNoteSchema),
	notesController.update
)

notesRouter.delete('/:id', notesController.delete)

notesRouter.use('/:noteId/todos', noteTodosRouter)
