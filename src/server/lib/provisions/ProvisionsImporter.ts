import type { Importer } from '../../interfaces/Importer';
import type { Repository } from '../../interfaces/Repository';
import type { ProvisionsKey } from '../../types/keys';
import { ProvisionsRepository } from './ProvisionsRepository';
import { provisionsTypes } from '../map/wiki/provisions';

export class ProvisionsImporter implements Importer<ProvisionsImporter>
{
    /**
     * Repository to access data storage
     */
    public repository: Repository<any> = new ProvisionsRepository;

    /**
     * Import to JSON files.
     * 
     * @param key the provision type e.g. provision
     */
    async json(key?: unknown | null) {               
        this.repository.clearCollection();

        if (!key) {
            // If no key is provided, loop through all wiki map keys to process
            // all the data from all wiki pages related to provision
            for (const provisionKey of Object.keys(provisionsTypes)) {
                await this.repository.storeToJsonFile(provisionKey);
            }

            // Return collection (multiple wiki pages = multiple representations)
            return this.repository.collection;
        } else {
            // Otherwise just process the specified wiki page corresponding to
            // the wiki map key provided.
            return await this.repository.storeToJsonFile(<ProvisionsKey>key);
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
            for (const provision of Object.keys(provisionsTypes)) {
                for (const provisionType of provisionsTypes[<ProvisionsKey>provision]) {
                    await this.repository.storeJsonFileToMongoDb(provisionType);
                }
            }
        } else {
            for (const provisionType of provisionsTypes[<ProvisionsKey>key]) {
                await this.repository.storeJsonFileToMongoDb(provisionType);
            }
        }
        
        return this;
    }
}