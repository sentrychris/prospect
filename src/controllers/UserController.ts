import type { Request, Response } from 'express';
import type { SqlRepository } from '../interfaces/Repository';
import type { User } from '../interfaces/User';
import { UserRepository } from '../repositories/UserRepository';

export default class UserController
{
  /**
   * Device data access
   */
  private repository: SqlRepository<User> = new UserRepository;

  /**
   * List
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
   * Show
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
   * Store
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