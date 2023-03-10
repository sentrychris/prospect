import type { Request } from 'express';
import type { Collection, Document } from 'mongodb';
import type { Repository } from '../lib/interfaces/Repository';
import type { Device, DeviceProjectionInterface } from '../lib/interfaces/Device';
import { MongoCollectionKey } from '../lib/MongoClient';
import { BaseRepository } from './BaseRepository';
import { Paginator } from '../lib/Paginator';
import { client } from '../database';

export class DeviceRepository extends BaseRepository implements Repository<Device>
{
  /**
   * Fetch document
   * 
   * @param req 
   * @returns 
   */
  async get(req: Request) {
    const collection = await client.getCollection(MongoCollectionKey.Device);
      
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

    const collection = await new Paginator<DeviceProjectionInterface>(
      // collection
      await client.getCollection(MongoCollectionKey.Device) as unknown as Collection<Document>,
      // aggregation
      [
        { $match: req.$match },
        { $sort: { 'record.lastSeen': -1 } }
      ],
      // projection
      {
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        project: {
          _id: 1,
          hwid: 1,
          hostname: 1,
          os: 1,
          software: 1,
          hardware: 1,
          last_seen: 1
        }
      }
    ).collect();

    this.collection.push(collection);
    
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

    const collection = await client.getCollection(MongoCollectionKey.Device);
    
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