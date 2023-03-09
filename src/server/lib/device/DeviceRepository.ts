import type { Device } from '../../../shared/interfaces/resource/Device';
import type { DeviceCollection  } from '../../../shared/types/collections';
import type { DeviceKey } from '../../../shared/types/keys';
import { DeviceParser } from './DeviceParser';
import { deviceTypes } from '../../map/wiki/deviceTypes';
import { client } from '../../database';
import { MongoCollectionKey } from '../../../shared/enums/collections';
import { BaseRepository } from '../BaseRepository';

export class DeviceRepository extends BaseRepository<DeviceParser, DeviceKey, Device, DeviceCollection>
{
  /**
  * Store data to JSON file.
  * 
  * This method uses the parser to fetch data from the tarkov wiki
  * and return it in a JSON array for writing to files at the
  * designated storage path.
  * 
  * @param key 
  * @returns 
  */
  async storeToJsonFile(key: DeviceKey) {
    return this.store('json', {
      key,
      types: deviceTypes,
      parser: new DeviceParser
    });
  }
  
  /**
  * Store JSON file data to MongoDB.
  * 
  * This method is quite straight-forward, it just passes
  * the JSON file to insertMany to upload the JSON to the
  * designated collection.
  * 
  * @param key
  * @returns 
  */
  async storeJsonFileToMongoDb(key: string, type: string) {
    try {
      const data = await this.readJsonFile(key, type);
      const collection = await client.getCollection(MongoCollectionKey.Device);
      const response = await collection.insertMany(data);
      
      return response;
    } catch (error) {
      console.log(error);
    }
    
    return [];
  }
}