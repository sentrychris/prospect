import type { Repository } from '../../interfaces/Repository';
import type { Armor } from '../../interfaces/dao/Armor';
import type { ArmorCollection } from '../../types/collections';
import type { ArmorKey } from '../../types/keys';
import { armorParser } from './ArmorParser';
import { armorTypes } from '../../map/wiki/armor';
import { settings } from '../../config';
import { client } from '../../database';
import * as fs from 'fs';

export class ArmorRepository implements Repository<ArmorCollection>
{
    /**
     * Storage path
     */
    public path: string = settings.app.storage;

    /**
     * Collected data
     */
    public collection: Array<ArmorCollection> = [];
    
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
        for (const armorType of armorTypes[key]) {
            const armor = await armorParser.fetchSource(armorType);
            const data = await armor.parseData();

            if (data && data instanceof Array<Armor>) {
                await this.writeJsonFile(armorType, data);
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
                const collection = await client.getCollection('armor');
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
    private async writeJsonFile(key: string, data: Array<Armor>) {
        fs.writeFileSync(`${this.path}/armor/${key}.json`,
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
        const data = fs.readFileSync(`${this.path}/armor/${key}.json`, {
            encoding: 'utf-8',
        });

        return JSON.parse(data);
    }
}