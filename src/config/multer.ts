import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import { AppError } from '../errors/AppError'

export const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')
export const uploadsFolder = path.resolve(__dirname, '..', '..', 'uploads')

const multerDiskConfig = multer.diskStorage({
	destination: tmpFolder,

	filename(request, file, callback) {
		const fileHash = crypto.randomBytes(10).toString('hex')
		const filename = `${fileHash}-${file.originalname}`.replace(' ', '_')

		return callback(null, filename)
	}
})

export const multerUpload = multer({
	storage: multerDiskConfig,

	fileFilter(request, file, callback) {
		const isImage = file.mimetype.startsWith('image')

		if (isImage) {
			return callback(null, true)
		}

		callback(new AppError('File is not an image.') as any)
	},

  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB
  }
})
