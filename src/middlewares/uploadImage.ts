import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

import { multerUpload, tmpFolder, uploadsFolder } from '../config/multer'
import { prisma } from '../database/prisma'
import { AppError } from '../errors/AppError'

export const uploadImage = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const multerHandler = multerUpload.single('image')

	multerHandler(request, response, async () => {
		if (!request.file) {
			throw new AppError('Error uploading file.')
		}

		const userId = request.user.id

		const { filename } = request.file

		const image = await prisma.image.create({
			data: {
				filename,
				userId
			}
		})

		fs.renameSync(
			path.resolve(tmpFolder, filename),
			path.resolve(uploadsFolder, filename)
		)

		request.uploadedImage = {
			url: `http://localhost:3333/public/${filename}`,
			...image
		}

		next()
	})
}
