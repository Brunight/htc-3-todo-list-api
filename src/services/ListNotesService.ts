import { prisma } from "../database/prisma";

interface ListNotesServiceParams {
  userId: string
}

export class ListNotesService {
  async execute({ userId }: ListNotesServiceParams) {
    const notes = await prisma.note.findMany({
      where: {
        userId
      },
      include: {
        todos: true
      }
    })

    return notes
  }
}