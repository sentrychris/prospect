import type { Request } from 'express';
import type { User } from '../interfaces/User';
import { sign } from 'jsonwebtoken';
import { Op } from 'sequelize';
import { User as UserModel } from '../models/User';
import { Device } from '../models/Device';
import { DataService } from './DataService';
import { settings } from '../config';

export class UserService extends DataService
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
        id: req.params.id
      },
      include: Device
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
    const user = await UserModel.findOne({
      where: {
        email: req.body.email
      }
    });

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
  async search(req: Request) {
    let users;
    if (req.query.email) {
      const email = <string>req.query.email;
      users = await UserModel.findAll({
        where: {
          email: {
            [Op.like]: `%${email}%`
          }
        }
      });
    } else {
      users = await UserModel.findAll();
    }

    return users;
  }

  /**
   * Store
   * 
   * @param data 
   * @returns 
   */
  async store(req: Request) {
    const data = <User>req.body;

    let user = await UserModel.findOne({
      where: {
        email: data.email
      }
    });

    if (user) {
      throw Error('User with this email already exists.');
    }

    // @ts-ignore
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