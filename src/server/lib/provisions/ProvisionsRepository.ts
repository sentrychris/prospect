import type { Provisions } from '../../interfaces/dao/Provisions';
import type { ProvisionsCollection } from '../../types/collections';
import type { ProvisionsKey } from '../../types/keys';
import { provisionsParser } from './ProvisionsParser';
import { provisionsTypes } from '../../map/wiki/provisions';
import { client } from '../../database';
import { BaseRepository } from '../BaseRepository';

export class ProvisionsRepository extends BaseRepository<ProvisionsKey, Provisions, ProvisionsCollection>
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
  async storeToJsonFile(key: ProvisionsKey) {
    return this.store('json', {
      key,
      types: provisionsTypes,
      parser: provisionsParser
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