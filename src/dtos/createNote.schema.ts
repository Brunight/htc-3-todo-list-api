import * as Yup from 'yup'
import { createNoteTodoSchema } from './createNoteTodo.schema'

export const createNoteSchema = Yup.object().shape({
	title: Yup.string().required().strict(),
	text: Yup.string().strict(),
	todos: Yup.array(createNoteTodoSchema)
})
