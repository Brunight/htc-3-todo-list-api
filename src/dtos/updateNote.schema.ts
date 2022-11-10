import * as Yup from 'yup'

export const updateNoteSchema = Yup.object().shape({
	title: Yup.string().required().strict(),
	text: Yup.string().strict(),
})
