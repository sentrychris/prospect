import type { Request } from 'express';
import type { SqlRepository } from '../interfaces/Repository';
import type { User } from '../interfaces/User';
import { sign } from 'jsonwebtoken';
import { User as UserModel } from '../models/User';
import { BaseRepository } from './BaseRepository';
import { settings } from '../config';

export class UserRepository extends BaseRepository implements SqlRepository<User>
{
  /**
   * Fetch document
   * 
   * @param req 
   * @returns 
   */
  async get(req: Request) {
    const user = await UserModel.findOne({
      where: {
        email: req.body.email
      }
    });
    
    return user;
  }

  /**
   * Verify
   * 
   * @param req 
   * @returns 
   */
  async verify(req: Request) {
    const user = await this.get(req);

    if (! user) {
      return false;
    }
    
    const verified = UserModel.verifyPassword(req.body.password, user);

    if (! verified) {
      return false;
    }

    user.token = this.getToken(user);

    return user;
  }

  /**
   * Search
   * 
   * @returns 
   */
  async search() {
    const user = UserModel.findAll();
    return user;
  }

  /**
   * Store
   * 
   * @param data 
   * @returns 
   */
  async store(data: User) {
    let user = await UserModel.findOne({
      where: {
        email: data.email
      }
    });

    if (user) {
      throw Error('User with this email already exists.');
    }

    //@ts-ignore
    user = await UserModel.create({
      name: data.name,
      email: data.email,
      password: data.password
    });

    user.token = this.getToken(user);

    return user;
  }

  /**
   * Get token
   * 
   * @param user 
   * @returns 
   */
  private getToken(user: UserModel) {
    return sign({
      id: user.id,
      email: user.email
    }, settings.app.secret, {
      expiresIn: '2h'
    });
  }
}