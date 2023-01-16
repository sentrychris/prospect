import type { Importer } from '../../interfaces/Importer';
import type { Repository } from '../../interfaces/Repository';
import type { QuestsKey } from '../../types/keys';
import { QuestsRepository } from './QuestsRepository';
import { questsTypes } from '../../map/wiki/quests';

export class QuestsImporter implements Importer<QuestsImporter>
{
    /**
     * Repository to access data storage
     */
    public repository: Repository<any> = new QuestsRepository;

    /**
     * Import to JSON files.
     * 
     * @param key the quest type e.g. Prapor
     */
    async json(key?: unknown | null) {               
        this.repository.clearCollection();

        if (!key) {
            // If no key is provided, loop through all wiki map keys to process
            // all the data from all wiki pages related to quests
            for (const questKey of Object.keys(questsTypes)) {
                await this.repository.storeToJsonFile(questKey);
            }

            // Return collection (multiple wiki pages = multiple representations)
            return this.repository.collection;
        } else {
            // Otherwise just process the specified wiki page corresponding to
            // the wiki map key provided.
            return await this.repository.storeToJsonFile(<QuestsKey>key);
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
            for (const quest of Object.keys(questsTypes)) {
                for (const questType of questsTypes[<QuestsKey>quest]) {
                    await this.repository.storeJsonFileToMongoDb(questType);
                }
            }
        } else {
            for (const questType of questsTypes[<QuestsKey>key]) {
                await this.repository.storeJsonFileToMongoDb(questType);
            }
        }
        
        return this;
    }
}