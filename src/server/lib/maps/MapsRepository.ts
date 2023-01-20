import type { Map } from '../../../shared/interfaces/resource/Map';
import type { MapsCollection } from '../../../shared/types/collections';
import type { MapsKey } from '../../../shared/types/keys';
import { MapsParser } from './MapsParser';
import { mapsTypes } from '../../map/wiki/maps';
import { client } from '../../database';
import { MongoCollectionKey } from '../../../shared/enums/collections';
import { BaseRepository } from '../BaseRepository';

export class MapsRepository extends BaseRepository<MapsParser, MapsKey, Map, MapsCollection>
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
    async storeToJsonFile(key: MapsKey) {
        return this.store('json', {
            key,
            types: mapsTypes,
            parser: new MapsParser
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
            const collection = await client.getCollection(MongoCollectionKey.Map);
            const response = await collection.insertMany(data);
      
            return response;
        } catch (error) {
            console.log(error);
        }
    
        return [];
    }
}