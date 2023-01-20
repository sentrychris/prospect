import type { Importer } from '../../../shared/interfaces/Importer';
import type { AmmoKey } from '../../../shared/types/keys';
import type { AmmoCollection } from '../../../shared/types/collections';
import { AmmoRepository } from './AmmoRepository';
import { ammoTypes } from '../../map/wiki/ammo';

export class AmmoImporter implements Importer<AmmoKey, AmmoCollection>
{
  /**
  * Repository to access data storage.
  */
  public repository = new AmmoRepository;
  
  /**
  * Import to JSON files.
  */
  async json() {            
    this.repository.clearCollection();
    
    for (const ammoKey of Object.keys(ammoTypes)) {
      await this.repository.storeToJsonFile(<AmmoKey>ammoKey);
    }
    
    return this.repository.collection;
  }
  
  /**
  * Import to MongoDB
  */
  async mongo() {
    this.repository.clearCollection();
    
    for (const ammo of Object.keys(ammoTypes)) {
      for (const ammoType of ammoTypes[<AmmoKey>ammo]) {
        await this.repository.storeJsonFileToMongoDb(ammo, ammoType);
      }
    }
    
    return this.repository.collection;
  }
}