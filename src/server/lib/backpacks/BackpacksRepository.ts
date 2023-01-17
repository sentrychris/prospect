import type { Backpack } from '../../interfaces/dao/Backpack';
import type { BackpackCollection } from '../../types/collections';
import type { BackpacksKey } from '../../types/keys';
import { backpacksParser } from './BackpacksParser';
import { backpacksTypes } from '../../map/wiki/backpacks';
import { client } from '../../database';
import { BaseRepository } from '../BaseRepository';

export class BackpacksRepository extends BaseRepository<BackpacksKey, Backpack, BackpackCollection>
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
            parser: backpacksParser
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
    async storeJsonFileToMongoDb(key: string | null = null) {
        try {
            if (key) {
                const data = await this.readJsonFile(key);
                const collection = await client.getCollection('backpacks');
                const response = await collection.insertMany(data);

                return response;
            }
        } catch (error) {
            console.log(error);
        }

        return [];
    }
}