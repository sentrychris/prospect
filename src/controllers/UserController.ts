import type { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export default class UserController
{
  /**
   * Data access
   */
  private service = new UserService;

  /**
   * List
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
   * Show
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
   * Store
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