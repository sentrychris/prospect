import type { Repository } from '../../interfaces/Repository';
import type { Ammo } from '../../interfaces/dao/Ammo';
import type { AmmoCollection } from '../../types/collections';
import type { AmmoKey } from '../../types/keys';
import { ammoParser } from './AmmoParser';
import { ammoTypes } from '../map/wiki/ammo';
import { settings } from '../../config';
import { client } from '../../database';
import * as fs from 'fs';

export class AmmoRepository implements Repository<AmmoCollection>
{
    /**
     * Storage path
     */
    public path: string = settings.app.storage;

    /**
     * Collected data
     */
    public collection: Array<AmmoCollection> = [];
    
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
        for (const ammoType of ammoTypes[key]) {
            const ammo = await ammoParser.fetchSource(ammoType);
            const ballistics = await ammo.parseData();

            if (ballistics && ballistics instanceof Array<Ammo>) {
                await this.writeJsonFile(ammoType, ballistics);
                this.collection.push(ballistics);
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
                const collection = await client.getCollection('_ammo');
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
    private async writeJsonFile(key: string, data: Array<Ammo>) {
        fs.writeFileSync(`${this.path}/ammo/${key}.json`,
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
        const data = fs.readFileSync(`${this.path}/ammo/${key}.json`, {
            encoding: 'utf-8',
        });

        return JSON.parse(data);
    }
}