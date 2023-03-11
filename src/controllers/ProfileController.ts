import type { Request, Response } from 'express';
import type { MongoRepository } from '../interfaces/Repository';
import type { Profile } from '../interfaces/Profile';
import { ProfileRepository } from '../repositories/ProfileRepository';

export default class ProfileController
{
  /**
   * Profiling data access
   */
  private repository: MongoRepository<Profile>  = new ProfileRepository;

  /**
   * List device profiles
   * 
   * @param req 
   * @param res 
   */
  async index(req: Request, res: Response) {
    try {
      const data = await this.repository.search(req);
      res.send(data);
    } catch (error) {
      res.send(error).status(400);
    }
  }

  /**
   * Show device profile
   * 
   * @param req 
   * @param res 
   */
  async show(req: Request, res: Response) {
    try {
      const result = await this.repository.get(req);
      res.send(result);
    } catch (error) {
      res.send(error).status(400);
    }
  }

  /**
   * Store device profile
   * 
   * @param req 
   * @param res 
   */
  async store(req: Request, res: Response) {
    try {
      const result = await this.repository.store(req.body);
      res.send(result);
    } catch (error) {
      res.send(error).status(400);
    }
  }
}