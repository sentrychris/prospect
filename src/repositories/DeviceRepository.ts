import type { Request } from 'express';
import type { Document } from 'mongodb';
import type { Repository } from '../interfaces/Repository';
import type { Device, DeviceProjection } from '../interfaces/Device';
import { MongoCollectionKey } from '../libraries/MongoClient';
import { BaseRepository } from './BaseRepository';
import { PaginatedRequest } from '../libraries/PaginatedRequest';
import { mongoClient } from '../database';

export class DeviceRepository extends BaseRepository implements Repository<Device>
{
  /**
   * Default projection
   */
  private projection: DeviceProjection = {
    _id: 1, hwid: 1, hostname: 1, os: 1, software: 1, hardware: 1, last_seen: 1
  };

  /**
   * Fetch document
   * 
   * @param req 
   * @returns 
   */
  async get(req: Request) {
    const collection = await mongoClient.getCollection(MongoCollectionKey.Device);
      
    return await collection.findOne({
      'hwid': req.params.id
    });
  }

  /**
   * Fetch collection
   * 
   * @param req 
   * @returns 
   */
  async search(req: Request): Promise<Document[]> {
    this.clearCollection();
    
    this.collection.push(await new PaginatedRequest<DeviceProjection>(
      // collection
      await mongoClient.getCollection(MongoCollectionKey.Device),
      
      // aggregation
      [
        { $match: req.$match },
        { $sort: { 'record.lastSeen': -1 } }
      ],
      
      // projection
      {
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        project: this.projection
      }
    ).collect());
    
    return this.collection;
  }

  /**
  * Store document
  * 
  * @param key
  * @returns 
  */
  async store(data: Device) {
    this.clearCollection();

    const collection = await mongoClient.getCollection(MongoCollectionKey.Device);
    
    const device = await collection.findOne({
      'hwid': new RegExp(<string>data.hwid, 'i')
    });

    data.last_seen = new Date;

    device
      ? await collection.updateOne({ 'hwid': data.hwid }, { $set: data })
      : await collection.insertOne(data);
    
    this.collection.push(data);
    
    return this.collection;
  }
}