import type { Request } from 'express';
import type { Document } from 'mongodb';
import type { Repository } from '../interfaces/Repository';
import type { Device } from '../interfaces/Device';
import { client } from '../../database';
import { MongoCollectionKey } from '../enums/collections';
import { BaseRepository } from './BaseRepository';

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

    const collection = await client.getCollection(MongoCollectionKey.Device);

    if (req.query.search && req.query.search === 'atlas') {
      const collect = await collection.aggregate([{
        $search: {
          index: 'default',
          text: {
            path: 'hostname',
            query: req.query.hostname,
            fuzzy: {}
          }
        }
      }]).toArray();


      this.collection.push(collect);
    } else {
      const collect = await collection.find({
        'hostname': new RegExp(<string>req.query.hostname, 'i')
      }).toArray();

      this.collection.push(collect);
    }
    
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