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
   * Register
   * 
   * @param req 
   * @param res 
   */
  async register(req: Request, res: Response) {
    try {
      const data = await this.repository.store(req);
      res.send(data);
    } catch (error) {
      res.send(error).status(400);
    }
  }

  /**
   * Login
   * 
   * @param req 
   * @param res 
   */
  async login(req: Request, res: Response) {
    const user = await this.repository.verify(req);
    console.log(user);
    res.send(user);
  }

  /**
   * Verify
   * 
   * @param req 
   * @param res 
   */
  async verify(req: Request, res: Response) {
    const user = req.user;
    res.send(user);
  }
}