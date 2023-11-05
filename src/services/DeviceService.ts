import type { Request } from 'express';
import type { UserAuth } from '../interfaces/User';
import type { Device, DeviceQuery } from '../interfaces/Device';
import { Op } from 'sequelize';
import { User } from '../models/User';
import { Device as DeviceModel } from '../models/Device';
import { DataService } from './DataService';

export class DeviceService extends DataService
{
  /**
   * Fetch document
   * 
   * @param req 
   * @returns 
   */
  async get(req: Request) {
    const device = await DeviceModel.findOne({
      where: {
        id: req.params.id
      },
      include: User
    });
    
    return device;
  }

  /**
   * Verify
   * 
   * @param req 
   * @returns 
   */
  async verify(req: Request) {
    const device = await DeviceModel.findOne({
      where: {
        hwid: req.body.hwid
      }
    });

    if (! device) {
      return false;
    }

    return device;
  }

  /**
   * Search
   * 
   * @returns 
   */
  async search(req: Request) {
    const user = <UserAuth>req.user;
    const query: DeviceQuery = {
      where: {
        userId: user.id
      }
    };

    if (req.query.hwid) {
      const hwid = <string>req.query.hwid;
      query.where.hwid = {
        [Op.like]: `%${hwid}%`
      };
    }

    return await DeviceModel.findAll(query);
  }

  /**
   * Store
   * 
   * @param data 
   * @returns 
   */
  async store(req: Request) {
    const user = <UserAuth>req.user;
    const data = <Device>req.body;

    let device = await DeviceModel.findOne({
      where: {
        hwid: data.hwid
      }
    });

    if (device) {
      throw Error('Device with this hwid already exists.');
    }

    // @ts-ignore
    device = await DeviceModel.create({
      userId: user.id,
      hwid: data.hwid
    });

    return device;
  }
}