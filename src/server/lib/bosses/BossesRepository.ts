import type { Boss } from '../../../shared/interfaces/resource/Boss';
import type { BossesCollection  } from '../../../shared/types/collections';
import type { BossesKey } from '../../../shared/types/keys';
import { BossesParser } from './BossesParser';
import { bossesTypes } from '../../map/wiki/bosses';
import { client } from '../../database';
import { MongoCollectionKey } from '../../../shared/enums/collections';
import { BaseRepository } from '../BaseRepository';

export class BossesRepository extends BaseRepository<BossesParser, BossesKey, Boss, BossesCollection>
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
  async storeToJsonFile(key: BossesKey) {
    return this.store('json', {
      key,
      types: bossesTypes,
      parser: new BossesParser
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
      const collection = await client.getCollection(MongoCollectionKey.Boss);
      const response = await collection.insertMany(data);
      
      return response;
    } catch (error) {
      console.log(error);
    }
    
    return [];
  }
}