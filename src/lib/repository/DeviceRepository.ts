import type { Request } from 'express';
import type { Document } from 'mongodb';
import type { Device } from '../interfaces/resource/Device';
import { client } from '../../database';
import { MongoCollectionKey } from '../enums/collections';
import { BaseRepository } from './BaseRepository';

export class DeviceRepository extends BaseRepository
{
  async access(req: Request): Promise<Document[]> {
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
    } else {
      result = await collection.find({
        'hostname': new RegExp(<string>req.query.hostname, 'i')
      }).toArray();
    }
    
    return result;
  }

  /**
  * Store data in MongoDB.
  * 
  * @param key
  * @returns 
  */
  async store(data: Device) {
    try {
      const collection = await client.getCollection(MongoCollectionKey.Device);
      
      const device = await collection.findOne({
        'hwid': new RegExp(<string>data.hwid, 'i')
      });

      const response = device
        ? await collection.updateOne({ 'hwid': data.hwid }, { $set: data })
        : await collection.insertOne(data);
      
      this.collection.push(data);

      return response;
    } catch (error) {
      console.log(error);
    }
    
    return [];
  }
}