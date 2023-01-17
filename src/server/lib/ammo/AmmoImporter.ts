import type { Importer } from '../../interfaces/Importer';
import type { AmmoKey } from '../../types/keys';
import type { AmmoCollection } from '../../types/collections';
import { AmmoRepository } from './AmmoRepository';
import { ammoTypes } from '../../map/wiki/ammo';

/**
 * Ammo Importer.
 */
export class AmmoImporter implements Importer<AmmoKey, AmmoCollection>
{
    /**
     * Repository to access data storage.
     */
    public repository = new AmmoRepository;

    /**
     * Import to JSON files.
     * 
     * @param key the ammo type e.g. pistol, shotgun
     */
    async json(key?: unknown | null) {            
        this.repository.clearCollection();

        if (!key) {        
            // If no key is provided, loop through all wiki map keys to process
            // all the data from all wiki pages related to ammo   
            for (const ammoKey of Object.keys(ammoTypes)) {
                await this.repository.storeToJsonFile(<AmmoKey>ammoKey);
            }

            // Return collection (multiple wiki pages = multiple representations)
            return this.repository.collection;
        } else {
            // Otherwise just process the specified wiki page corresponding to
            // the wiki map key provided.
            return await this.repository.storeToJsonFile(<AmmoKey>key);
        }
    }
    
    /**
     * Import to MongoDB
     * 
     * @param key 
     */
    async mongo(key?: unknown | null) {
        this.repository.clearCollection();

        if (!key) {
            for (const ammo of Object.keys(ammoTypes)) {
                for (const ammoType of ammoTypes[<AmmoKey>ammo]) {
                    await this.repository.storeJsonFileToMongoDb(ammoType);
                }
            }
        } else {
            for (const ammoType of ammoTypes[<AmmoKey>key]) {
                await this.repository.storeJsonFileToMongoDb(ammoType);
            }
        }
        
        return this.repository.collection;
    }
}