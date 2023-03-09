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