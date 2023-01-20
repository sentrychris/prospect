import type { Importer } from '../../../shared/interfaces/Importer';
import type { BackpacksKey } from '../../../shared/types/keys';
import type { BackpackCollection } from '../../../shared/types/collections';
import { BackpacksRepository } from './BackpacksRepository';
import { backpacksTypes } from '../../map/wiki/backpacks';

export class BackpacksImporter implements Importer<BackpacksKey, BackpackCollection>
{
  /**
  * Repository to access data storage.
  */
  public repository = new BackpacksRepository;
  
  /**
  * Import to JSON files.
  */
  async json() {            
    this.repository.clearCollection();
    
    for (const backpackKey of Object.keys(backpacksTypes)) {
      await this.repository.storeToJsonFile(<BackpacksKey>backpackKey);
    }
    
    return this.repository.collection;
  }
  
  /**
  * Import to MongoDB
  */
  async mongo() {
    this.repository.clearCollection();
    
    for (const backpack of Object.keys(backpacksTypes)) {
      for (const backpackType of backpacksTypes[<BackpacksKey>backpack]) {
        await this.repository.storeJsonFileToMongoDb(backpack, backpackType);
      }
    }
    
    return this.repository.collection;
  }
}