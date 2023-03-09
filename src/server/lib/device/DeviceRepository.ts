import type { Device } from '../../interfaces/resource/Device';
import { client } from '../../database';
import { MongoCollectionKey } from '../../enums/collections';
import { BaseRepository } from '../BaseRepository';

export class DeviceRepository extends BaseRepository<Device>
{ 
  /**
  * Store data in MongoDB.
  * 
  * @param key
  * @returns 
  */
  async mongo(data: Device) {
    try {
      const collection = await client.getCollection(MongoCollectionKey.Device);
      const response = await collection.insertOne(data);
      
      this.collection.push(data);

      return response;
    } catch (error) {
      console.log(error);
    }
    
    return [];
  }
}