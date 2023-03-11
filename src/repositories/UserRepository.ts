import type { Request } from 'express';
import type { SqlRepository } from '../interfaces/Repository';
import type { User } from '../interfaces/User';
import { User as UserModel } from '../models/User';
import { BaseRepository } from './BaseRepository';

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

    return user;
  }

  async search() {
    const user = UserModel.findAll();
    console.log({ user })
    return user;
  }

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
    user = UserModel.create({
      name: data.name,
      email: data.email,
      password: data.password
    });

    return user;
  }
}