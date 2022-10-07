import { prisma } from "../database/prisma";

export class ListNotesService {
  async execute() {
    const notes = await prisma.note.findMany({
      include: {
        todos: true
      }
    })

    return notes
  }
}