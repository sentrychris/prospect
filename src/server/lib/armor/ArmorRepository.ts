import type { Armor } from '../../interfaces/dao/Armor';
import type { ArmorCollection } from '../../types/collections';
import type { ArmorKey } from '../../types/keys';
import { armorParser } from './ArmorParser';
import { armorTypes } from '../../map/wiki/armor';
import { client } from '../../database';
import { BaseRepository } from '../BaseRepository';

export class ArmorRepository extends BaseRepository<ArmorKey, Armor, ArmorCollection>
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
      parser: armorParser
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
      const collection = await client.getCollection('_test');
      const response = await collection.insertMany(data);
      
      return response;
    } catch (error) {
      console.log(error);
    }
    
    return [];
  }
}