import { Router } from 'express'
import { todoRouter } from "./todo.routes";

export const routes = Router()

routes.use('/todo', todoRouter)
