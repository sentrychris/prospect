import type { Repository } from '../../interfaces/Repository';
import type { Provisions } from '../../interfaces/Provisions';
import type { ProvisionsCollection } from '../../types/collections';
import type { ProvisionsKey } from '../../types/keys';
import { provisionsParser } from './ProvisionsParser';
import { provisionsTypes } from '../map/wiki/provisions';
import { settings } from '../../config';
import { client } from '../../database';
import * as fs from 'fs';

export class ProvisionsRepository implements Repository<ProvisionsCollection>
{
    /**
     * Storage path
     */
    public path: string = settings.app.storage;

    /**
     * Collected data
     */
    public collection: Array<ProvisionsCollection> = [];
    
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
        for (const provisionType of provisionsTypes[key]) {
            const provisions = await provisionsParser.fetchSource(provisionType);
            const data = await provisions.parseData();

            if (data && data instanceof Array<Provisions>) {
                await this.writeJsonFile(provisionType, data);
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
                const collection = await client.getCollection('provisions');
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
    private async writeJsonFile(key: string, data: Array<Provisions>) {
        fs.writeFileSync(`${this.path}/provisions/${key}.json`,
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
        const data = fs.readFileSync(`${this.path}/provisions/${key}.json`, {
            encoding: 'utf-8',
        });

        return JSON.parse(data);
    }
}