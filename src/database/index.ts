import fs from 'fs'
import path from 'path'

// id
// text
// checked

type ToDoListItem = {
  id: string
  text: string
  checked: boolean
}

type ToDoList = ToDoListItem[]

const dbPath = path.resolve(__dirname, 'db.json')

export function getList(): ToDoList {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))

  return data.todos
}

export function setList(todoList: ToDoList) {
  const stringfiedTodoList = JSON.stringify({ todos: todoList }, null, 2)

  fs.writeFileSync(dbPath, stringfiedTodoList)
}