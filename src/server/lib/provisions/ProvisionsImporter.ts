import type { Importer } from '../../interfaces/Importer';
import type { ProvisionsKey } from '../../types/keys';
import type { ProvisionsCollection } from '../../types/collections';
import { ProvisionsRepository } from './ProvisionsRepository';
import { provisionsTypes } from '../../map/wiki/provisions';

export class ProvisionsImporter implements Importer<ProvisionsKey, ProvisionsCollection>
{
    /**
  * Repository to access data storage
  */
    public repository = new ProvisionsRepository;
  
    /**
  * Import to JSON files.
  */
    async json() {               
        this.repository.clearCollection();
    
        for (const provisionKey of Object.keys(provisionsTypes)) {
            await this.repository.storeToJsonFile(<ProvisionsKey>provisionKey);
        }
    
        return this.repository.collection;
    }
  
    /**
  * Import to MongoDB
  */
    async mongo() {
        this.repository.clearCollection();
    
        for (const provision of Object.keys(provisionsTypes)) {
            for (const provisionType of provisionsTypes[<ProvisionsKey>provision]) {
                await this.repository.storeJsonFileToMongoDb(provision, provisionType);
            }
        }
    
        return this.repository.collection;
    }
}