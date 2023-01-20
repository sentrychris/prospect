import type { Importer } from '../../../shared/interfaces/Importer';
import type { QuestsKey } from '../../../shared/types/keys';
import type { QuestsCollection } from '../../../shared/types/collections';
import { QuestsRepository } from './QuestsRepository';
import { questsTypes } from '../../map/wiki/quests';

export class QuestsImporter implements Importer<QuestsKey, QuestsCollection>
{
  /**
  * Repository to access data storage.
  */
  public repository = new QuestsRepository;
  
  /**
  * Import to JSON files.
  */
  async json() {            
    this.repository.clearCollection();
    
    for (const questKey of Object.keys(questsTypes)) {
      await this.repository.storeToJsonFile(<QuestsKey>questKey);
    }
    
    return this.repository.collection;
  }
  
  /**
  * Import to MongoDB
  */
  async mongo() {
    this.repository.clearCollection();
    
    for (const quest of Object.keys(questsTypes)) {
      for (const questType of questsTypes[<QuestsKey>quest]) {
        await this.repository.storeJsonFileToMongoDb(quest, questType);
      }
    }
    
    return this.repository.collection;
  }
}