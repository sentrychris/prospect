import type { Importer } from '../../../shared/interfaces/Importer';
import type { ArmorKey } from '../../../shared/types/keys';
import type { ArmorCollection } from '../../../shared/types/collections';
import { ArmorRepository } from './ArmorRepository';
import { armorTypes } from '../../map/wiki/armor';

export class ArmorImporter implements Importer<ArmorKey, ArmorCollection>
{
    /**
  * Repository to access data storage.
  */
    public repository = new ArmorRepository;
  
    /**
  * Import to JSON files.
  */
    async json() {            
        this.repository.clearCollection();
    
        for (const armorKey of Object.keys(armorTypes)) {
            await this.repository.storeToJsonFile(<ArmorKey>armorKey);
        }
    
        return this.repository.collection;
    }
  
    /**
  * Import to MongoDB
  */
    async mongo() {
        this.repository.clearCollection();
    
        for (const armor of Object.keys(armorTypes)) {
            for (const armorType of armorTypes[<ArmorKey>armor]) {
                await this.repository.storeJsonFileToMongoDb(armor, armorType);
            }
        }
    
        return this.repository.collection;
    }
}