import type { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export default class UserController
{
  /**
   * User data access
   */
  private service = new UserService;

  /**
   * Register
   * 
   * @param req 
   * @param res 
   */
  async register(req: Request, res: Response) {
    try {
      const data = await this.service.store(req);
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
    const user = await this.service.verify(req);
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