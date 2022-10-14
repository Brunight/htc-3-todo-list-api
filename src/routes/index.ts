import express, { Router } from 'express'
import fs from 'fs'
import path from 'path'
import { multerUpload, tmpFolder } from '../config/multer'
import { AppError } from '../errors/AppError'
import { notesRouter } from './notes/index.routes'
import { todosRouter } from './todos.routes'

const uploadsFolder = path.resolve(__dirname, '..', '..', 'uploads')

export const routes = Router()

routes.use('/notes', notesRouter)

routes.use('/todos', todosRouter)

routes.use('/public', express.static(uploadsFolder))

routes.post('/upload', multerUpload.single('image'), (request, response) => {
	if (!request.file) {
		throw new AppError('Error uploading file.')
	}

	const { filename } = request.file

	fs.renameSync(
		path.resolve(tmpFolder, filename),
		path.resolve(uploadsFolder, filename)
	)

	response.status(201).json({ url: `http://localhost:3333/public/${filename}` })
})
