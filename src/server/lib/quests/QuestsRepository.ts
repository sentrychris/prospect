import type { Quest } from '../../../shared/interfaces/resource/Quest';
import type { QuestsCollection } from '../../../shared/types/collections';
import type { QuestsKey } from '../../../shared/types/keys';
import { QuestsParser } from './QuestsParser';
import { questsTypes } from '../../map/wiki/quests';
import { client } from '../../database';
import { BaseRepository } from '../BaseRepository';

export class QuestsRepository extends BaseRepository<QuestsParser, QuestsKey, Quest, QuestsCollection>
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
    async storeToJsonFile(key: QuestsKey) {
        return this.store('json', {
            key,
            types: questsTypes,
            parser: new QuestsParser
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