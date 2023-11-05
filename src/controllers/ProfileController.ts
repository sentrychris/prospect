import type { Request, Response } from 'express';
import { ProfileService } from '../services/ProfileService';

export default class ProfileController
{
  /**
   * Profiling data access
   */
  private service = new ProfileService;

  /**
   * List device profiles
   * 
   * @param req 
   * @param res 
   */
  async index(req: Request, res: Response) {
    try {
      const data = await this.service.search(req);
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
      const result = await this.service.get(req);
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
      const result = await this.service.store(req);
      res.send(result);
    } catch (error) {
      res.send(error).status(400);
    }
  }
}