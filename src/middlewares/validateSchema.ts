import { NextFunction, Request, Response } from 'express'
import * as Yup from 'yup'

export const validateSchema =
	(schema: Yup.AnySchema) =>
	async (request: Request, response: Response, next: NextFunction) => {
		await schema.validate(request.body, { abortEarly: false })

		next()
	}
