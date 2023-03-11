import type { Request, Response } from 'express';
import type { SqlRepository } from '../interfaces/Repository';
import type { User } from '../interfaces/User';
import { UserRepository } from '../repositories/UserRepository';

export default class UserController
{
  /**
   * User data access
   */
  private repository: SqlRepository<User> = new UserRepository;

  /**
   * List
   * 
   * @param req 
   * @param res 
   */
  async register(req: Request, res: Response) {
    try {
      const data = await this.repository.store(req.body);
      res.send(data);
    } catch (error) {
      res.send(error).status(400);
    }
  }

  async login(req: Request, res: Response) {
    const user = await this.repository.verify(req);
    console.log(user);
    res.send(user);
  }
}