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
    const user = UserModel.findAll();
    console.log(user)
    return user;
  }

  async search() {
    const user = UserModel.findAll();
    console.log({ user })
    return user;
  }

  async store(data: User) {
    return 2;
  }
}