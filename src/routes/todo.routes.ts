import { Router } from 'express'
import { getList, setList } from '../database'
import { v4 } from 'uuid'

export const todoRouter = Router()

todoRouter.get('/', function (request, response) {
	const todoList = getList()

	response.json(todoList)
})

todoRouter.get('/:id', function (request, response) {
	const { id } = request.params

	const todoList = getList()

	const item = todoList.find(function (itemToFind) {
		return id === itemToFind.id
	})

	if (!item) {
		response.status(404).json({ error: true, message: 'Item not found.' })
		return
	}

	response.json(item)
})

todoRouter.post('/', function (request, response) {
	const { text, checked } = request.body

	const item = {
		id: v4(),
		text,
		checked: !!checked
	}

	const todoList = getList()

	todoList.push(item)

	setList(todoList)

	response.status(201).json(item)
})

todoRouter.put('/:id', function (request, response) {
	const { id } = request.params
	const { text, checked } = request.body

	const todoList = getList()

	const item = todoList.find(function (itemToFind) {
		return id === itemToFind.id
	})

	if (!item) {
		response.status(404).json({ error: true, message: 'Item not found.' })
		return
	}

	if (text) {
		item.text = text
	}

	if (checked !== undefined) {
		item.checked = checked
	}

	setList(todoList)

	response.status(201).json(item)
})

todoRouter.patch('/:id/toggle', function (request, response) {
  const { id } = request.params

	const todoList = getList()

	const item = todoList.find(function (itemToFind) {
		return id === itemToFind.id
	})

	if (!item) {
		response.status(404).json({ error: true, message: 'Item not found.' })
		return
	}

  item.checked = !item.checked

  setList(todoList)

  response.json(item)
})

todoRouter.delete('/:id', function (request, response) {
	const { id } = request.params

	const todoList = getList()

	const newTodoList = todoList.filter(function (item) {
		return id !== item.id
	})

	if (todoList.length === newTodoList.length) {
		response.status(404).json({ error: true, message: 'Item not found.' })
		return
	}

	setList(newTodoList)

	response.send()
})
