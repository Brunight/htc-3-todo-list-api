import * as Yup from 'yup'

export const createNoteTodoSchema = Yup.object().shape({
	text: Yup.string().required().strict(),
	checked: Yup.boolean()
})
