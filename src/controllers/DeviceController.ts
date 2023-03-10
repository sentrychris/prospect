import type { Request, Response } from 'express';
import { Repository } from '../lib/interfaces/Repository';
import { Device } from '../lib/interfaces/resource/Device';
import { DeviceRepository } from '../lib/repository/DeviceRepository';
import { client } from '../database';
import { MongoCollectionKey } from '../lib/enums/collections';

export default class DeviceController
{

  private repository: Repository<Device> = new DeviceRepository;

  async index(req: Request, res: Response) {
    try {
      this.repository.a

      res.send(result);
    } catch (error) {
      res.send(error).status(400);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const collection = await client.getCollection(MongoCollectionKey.Device);
      
      const result = await collection.findOne({
        'hwid': req.params.id
      });

      res.send(result);
    } catch (error) {
      res.send(error).status(400);
    }
  }
}