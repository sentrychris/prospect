import type { Request } from 'express';
import type { SqlRepository } from '../interfaces/Repository';
import type { UserAuth } from '../interfaces/User';
import type { Device } from '../interfaces/Device';
import { Op } from 'sequelize';
import { User } from '..//models/User';
import { Device as DeviceModel } from '../models/Device';
import { BaseRepository } from './BaseRepository';

export class DeviceRepository extends BaseRepository implements SqlRepository<Device>
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

    let devices;
    if (req.query.hwid) {
      const hwid = <string>req.query.hwid;
      devices = await DeviceModel.findAll({
        where: {
          userId: user.id,
          hwid: {
            [Op.like]: `%${hwid}%`
          }
        }
      });
    } else {
      devices = await DeviceModel.findAll({
        where: {
          userId: user.id
        }
      });
    }

    return devices;
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