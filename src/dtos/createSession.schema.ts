import * as Yup from 'yup'

export const createSessionSchema = Yup.object().shape({
	email: Yup.string().required(),
	password: Yup.string().required()
})
