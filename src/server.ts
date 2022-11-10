import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { ValidationError } from 'yup'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'
import 'express-async-errors'

import { routes } from './routes'
import { AppError } from './errors/AppError'

const app = express()

app.use(cors())
app.use(express.json())

app.use(morgan('dev'))
app.use(
	morgan('common', {
		stream: fs.createWriteStream(path.resolve(__dirname, '..', 'access.log'), {
			flags: 'a'
		})
	})
)

app.get('/', function (request, response) {
	response.json({ message: 'Hello world!' })
})

app.use('/', routes)

// Error handler
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
	if (err instanceof ValidationError) {
		return response
			.status(400)
			.json({ error: true, message: err.errors.join(', ') })
	}

	console.log(err)

	if (err instanceof AppError) {
		return response
			.status(err.statusCode)
			.json({ error: true, message: err.message })
	}

	return response
		.status(500)
		.json({ error: true, message: 'Internal server error.' })
})

app.listen(3333, function () {
	console.log('🚀 Server started!')
})
