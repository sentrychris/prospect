import type { Repository } from '../../interfaces/Repository';
import type { Backpack } from '../../interfaces/dao/Backpack';
import type { BackpackCollection } from '../../types/collections';
import type { BackpacksKey } from '../../types/keys';
import { backpacksParser } from './BackpacksParser';
import { backpacksTypes } from '../../map/wiki/backpacks';
import { settings } from '../../config';
import { client } from '../../database';
import * as fs from 'fs';

export class BackpacksRepository implements Repository<BackpackCollection>
{
    /**
     * Storage path
     */
    public path: string = settings.app.storage;

    /**
     * Collected data
     */
    public collection: Array<BackpackCollection> = [];
    
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
        for (const backpackType of backpacksTypes[key]) {
            const backpacks = await backpacksParser.fetchSource(backpackType);
            const data = await backpacks.parseData();

            if (data && data instanceof Array<Backpack>) {
                await this.writeJsonFile(backpackType, data);
                this.collection.push(data);
            }
        }

        return this.collection;
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

    /**
     * Clear collected data.
     * 
     * This is usually called before loops to clear any
     * existing collections.
     */
    async clearCollection() {
        this.collection = [];
    }

    /**
     * Write JSON file
     * 
     * @param key 
     * @param data 
     */
    private async writeJsonFile(key: string, data: Array<Backpack>) {
        fs.writeFileSync(`${this.path}/backpacks/${key}.json`,
            JSON.stringify(data, null, 4),
            {
                encoding: 'utf-8'
            }
        );

        return this;
    }

    /**
     * Read JSON file
     * 
     * @param key
     * @returns 
     */
    private async readJsonFile(key: string) {
        const data = fs.readFileSync(`${this.path}/backpacks/${key}.json`, {
            encoding: 'utf-8',
        });

        return JSON.parse(data);
    }
}