import { Router } from 'express'
import ProfileController from '../controllers/ProfileController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export const profileRouter = Router()

const profileController = new ProfileController()

profileRouter.get('/', ensureAuthenticated, profileController.show)
