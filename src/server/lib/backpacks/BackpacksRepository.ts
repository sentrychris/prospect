import type { Backpack } from '../../../shared/interfaces/resource/Backpack';
import type { BackpackCollection } from '../../../shared/types/collections';
import type { BackpacksKey } from '../../../shared/types/keys';
import { BackpacksParser } from './BackpacksParser';
import { backpacksTypes } from '../../map/wiki/backpacks';
import { client } from '../../database';
import { MongoCollectionKey } from '../../../shared/enums/collections';
import { BaseRepository } from '../BaseRepository';

export class BackpacksRepository extends BaseRepository<BackpacksParser, BackpacksKey, Backpack, BackpackCollection>
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
  async storeToJsonFile(key: BackpacksKey) {
    return this.store('json', {
      key,
      types: backpacksTypes,
      parser: new BackpacksParser
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
      const collection = await client.getCollection(MongoCollectionKey.Backpack);
      const response = await collection.insertMany(data);
      
      return response;
    } catch (error) {
      console.log(error);
    }
    
    return [];
  }
}