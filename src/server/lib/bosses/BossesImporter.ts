import type { Importer } from '../../../shared/interfaces/Importer';
import type { BossesKey } from '../../../shared/types/keys';
import type { BossesCollection } from '../../../shared/types/collections';
import { bossesTypes } from '../../map/wiki/bosses';
import { BossesRepository } from './BossesRepository';

export class BossesImporter implements Importer<BossesKey, BossesCollection>
{
  /**
  * Repository to access data storage.
  */
  public repository = new BossesRepository;
  
  /**
  * Import to JSON files.
  */
  async json() {            
    this.repository.clearCollection();
    
    for (const key of Object.keys(bossesTypes)) {
      await this.repository.storeToJsonFile(<BossesKey>key);
    }
    
    return this.repository.collection;
  }
  
  /**
  * Import to MongoDB
  */
  async mongo() {
    this.repository.clearCollection();
    
    for (const key of Object.keys(bossesTypes)) {
      for (const obj of bossesTypes[<BossesKey>key]) {
        await this.repository.storeJsonFileToMongoDb(key, obj);
      }
    }
    
    return this.repository.collection;
  }
}