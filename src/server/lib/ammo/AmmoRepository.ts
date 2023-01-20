import type { Ammo } from '../../../shared/interfaces/resource/Ammo';
import type { AmmoCollection } from '../../../shared/types/collections';
import type { AmmoKey } from '../../../shared/types/keys';
import { AmmoParser } from './AmmoParser';
import { ammoTypes } from '../../map/wiki/ammo';
import { client } from '../../database';
import { MongoCollectionKey } from '../../../shared/enums/collections';
import { BaseRepository } from '../BaseRepository';

export class AmmoRepository extends BaseRepository<AmmoParser, AmmoKey, Ammo, AmmoCollection>
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
    async storeToJsonFile(key: AmmoKey) {
        return this.store('json', {
            key,
            types: ammoTypes,
            parser: new AmmoParser
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
            const collection = await client.getCollection(MongoCollectionKey.Ammo);
            const response = await collection.insertMany(data);
      
            return response;
        } catch (error) {
            console.log(error);
        }
    
        return [];
    }
}