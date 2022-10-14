import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { ValidationError } from 'yup'
import 'express-async-errors'

import { routes } from './routes'
import { AppError } from './errors/AppError'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', function (request, response) {
	response.json({ message: 'Hello world!' })
})

app.use('/', routes)

// Error handler
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
	if (err instanceof ValidationError) {
		return response.status(400).json({ error: true, message: err.message })
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
