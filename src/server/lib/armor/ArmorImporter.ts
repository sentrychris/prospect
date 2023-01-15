import type { Importer } from '../../interfaces/Importer';
import type { Repository } from '../../interfaces/Repository';
import type { ArmorKey } from '../../types/keys';
import { ArmorRepository } from './ArmorRepository';
import { armorTypes } from '../../map/wiki/armor';

/**
 * Armor Importer.
 */
export class ArmorImporter implements Importer<ArmorImporter>
{
    /**
     * Repository to access data storage.
     */
    public repository: Repository<any> = new ArmorRepository;

    /**
     * Import to JSON files.
     * 
     * @param key the armor type e.g. pistol, shotgun
     */
    async json(key?: unknown | null) {               
        this.repository.clearCollection();

        if (!key) {        
            // If no key is provided, loop through all wiki map keys to process
            // all the data from all wiki pages related to armor   
            for (const armorKey of Object.keys(armorTypes)) {
                await this.repository.storeToJsonFile(armorKey);
            }

            // Return collection (multiple wiki pages = multiple representations)
            return this.repository.collection;
        } else {
            // Otherwise just process the specified wiki page corresponding to
            // the wiki map key provided.
            return await this.repository.storeToJsonFile(<ArmorKey>key);
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
            for (const armor of Object.keys(armorTypes)) {
                for (const armorType of armorTypes[<ArmorKey>armor]) {
                    await this.repository.storeJsonFileToMongoDb(armorType);
                }
            }
        } else {
            for (const armorType of armorTypes[<ArmorKey>key]) {
                await this.repository.storeJsonFileToMongoDb(armorType);
            }
        }
        
        return this;
    }
}