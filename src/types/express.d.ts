type PrismaImage = import('@prisma/client').Image

interface RequestUploadedImage extends PrismaImage {
	url: string
}

declare namespace Express {
	export interface Request {
		uploadedImage?: RequestUploadedImage
		user: {
			id: string
		}
	}
}
