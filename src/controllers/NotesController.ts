import { Request, Response } from 'express'
import { CreateNoteService } from '../services/CreateNoteService'
import { ListNotesService } from '../services/ListNotesService'
import { ShowNoteService } from '../services/ShowNoteService'

export class NotesController {
	async index(request: Request, response: Response): Promise<Response> {
		const listNotes = new ListNotesService()

		const notes = await listNotes.execute()

		return response.json(notes)
	}

	async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const showNote = new ShowNoteService()

		const note = await showNote.execute({ id })

		return response.json(note)
	}

	async create(request: Request, response: Response): Promise<Response> {
		const { title, text, todos } = request.body

		const createNote = new CreateNoteService()

		const note = await createNote.execute({ title, text, todos })

		return response.status(201).json(note)
	}
	
	async update(request: Request, response: Response): Promise<Response> {
		// TODO PUT

		return response.json({})
	}

	async delete(request: Request, response: Response): Promise<Response> {
		// TODO DELETE

		return response.json({})
	}
}
