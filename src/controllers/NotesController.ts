import { Request, Response } from 'express'
import { CreateNoteService } from '../services/CreateNoteService'
import { DeleteNoteService } from '../services/DeleteNoteService'
import { ListNotesService } from '../services/ListNotesService'
import { ShowNoteService } from '../services/ShowNoteService'
import { UpdateNoteService } from '../services/UpdateNoteService'

export class NotesController {
	async index(request: Request, response: Response): Promise<Response> {
		const listNotes = new ListNotesService()

		const userId = request.user.id

		const notes = await listNotes.execute({ userId })

		return response.json(notes)
	}

	async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const userId = request.user.id

		const showNote = new ShowNoteService()

		const note = await showNote.execute({ id, userId })

		return response.json(note)
	}

	async create(request: Request, response: Response): Promise<Response> {
		const { title, text, todos } = request.body

		const userId = request.user.id

		const createNote = new CreateNoteService()

		const note = await createNote.execute({ title, text, todos, userId })

		return response.status(201).json(note)
	}

	async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const { title, text } = request.body

		const userId = request.user.id

		const updateNote = new UpdateNoteService()

		const note = await updateNote.execute({ id, title, text,userId })

		return response.json(note)
	}

	async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const userId = request.user.id

		const deleteNote = new DeleteNoteService()

		await deleteNote.execute({ id, userId })

		return response.send()
	}
}
