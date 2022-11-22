import express, { Router } from 'express'
import { uploadsFolder } from '../config/multer'
import { uploadImage } from '../middlewares/uploadImage'
import { usersRouter } from './users.routes'
import { profileRouter } from './profile.routes'
import { sessionsRouter } from './sessions.routes'
import { notesRouter } from './notes/index.routes'
import { todosRouter } from './todos.routes'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export const routes = Router()

routes.use('/users', usersRouter)

routes.use('/profile', profileRouter)

routes.use('/sessions', sessionsRouter)

routes.use('/notes', notesRouter)

routes.use('/todos', todosRouter)

routes.use('/public', express.static(uploadsFolder))

routes.post('/upload', ensureAuthenticated, uploadImage, (request, response) => {
	response.status(201).json(request.uploadedImage)
})
