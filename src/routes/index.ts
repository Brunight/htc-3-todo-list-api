import express, { Router } from 'express'
import { uploadsFolder } from '../config/multer'
import { uploadImage } from '../middlewares/uploadImage'
import { notesRouter } from './notes/index.routes'
import { todosRouter } from './todos.routes'

export const routes = Router()

routes.use('/notes', notesRouter)

routes.use('/todos', todosRouter)

routes.use('/public', express.static(uploadsFolder))

routes.post('/upload', uploadImage, (request, response) => {
	response.status(201).json(request.uploadedImage)
})
