import type { Importer } from '../../interfaces/Importer';
import type { Repository } from '../../interfaces/Repository';
import type { BackpacksKey } from '../../types/keys';
import { BackpacksRepository } from './BackpacksRepository';
import { backpacksTypes } from '../../map/wiki/backpacks';

/**
 * Backpack Importer.
 */
export class BackpacksImporter implements Importer<BackpacksImporter>
{
    /**
     * Repository to access data storage.
     */
    public repository: Repository<any> = new BackpacksRepository;

    /**
     * Import to JSON files.
     * 
     * @param key the backpack type
     */
    async json(key?: unknown | null) {               
        this.repository.clearCollection();

        if (!key) {        
            // If no key is provided, loop through all wiki map keys to process
            // all the data from all wiki pages related to backpacks   
            for (const backpackType of Object.keys(backpacksTypes)) {
                await this.repository.storeToJsonFile(backpackType);
            }

            // Return collection (multiple wiki pages = multiple representations)
            return this.repository.collection;
        } else {
            // Otherwise just process the specified wiki page corresponding to
            // the wiki map key provided.
            return await this.repository.storeToJsonFile(<BackpacksKey>key);
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
            for (const backpack of Object.keys(backpacksTypes)) {
                for (const backpackType of backpacksTypes[<BackpacksKey>backpack]) {
                    await this.repository.storeJsonFileToMongoDb(backpackType);
                }
            }
        } else {
            for (const backpackType of backpacksTypes[<BackpacksKey>key]) {
                await this.repository.storeJsonFileToMongoDb(backpackType);
            }
        }
        
        return this;
    }
}