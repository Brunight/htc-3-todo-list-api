import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import auth from '../config/auth'

import { AppError } from '../errors/AppError'

export function ensureAuthenticated(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const authHeader = request.headers.authorization

	if (!authHeader) {
		throw new AppError('JWT Token is missing.')
	}

	const token = authHeader.split(' ')[1]

	const {
		jwt: { secret }
	} = auth

	try {
		const { sub } = verify(token, secret)

		if (!sub) {
			throw new Error()
		}

		request.user = { id: sub as string }

		next()
	} catch {
		throw new AppError('Invalid JWT Token.')
	}
}
