import { Request, Response } from 'express';
import { ShowProfileService } from '../services/ShowProfileService';

export default class ProfileController {
  async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const showProfile = new ShowProfileService()

    const user = await showProfile.execute({ userId });

    return response.json(user);
  }
}
