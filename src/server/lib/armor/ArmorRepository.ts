import type { Armor } from '../../../shared/interfaces/resource/Armor';
import type { ArmorCollection } from '../../../shared/types/collections';
import type { ArmorKey } from '../../../shared/types/keys';
import { ArmorParser } from './ArmorParser';
import { armorTypes } from '../../map/wiki/armor';
import { client } from '../../database';
import { MongoCollectionKey } from '../../../shared/enums/collections';
import { BaseRepository } from '../BaseRepository';

export class ArmorRepository extends BaseRepository<ArmorParser, ArmorKey, Armor, ArmorCollection>
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
  async storeToJsonFile(key: ArmorKey) {
    return this.store('json', {
      key,
      types: armorTypes,
      parser: new ArmorParser
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
      const collection = await client.getCollection(MongoCollectionKey.Armor);
      const response = await collection.insertMany(data);
      
      return response;
    } catch (error) {
      console.log(error);
    }
    
    return [];
  }
}