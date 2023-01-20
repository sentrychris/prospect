import type { Importer } from '../../../shared/interfaces/Importer';
import type { MedicalKey } from '../../../shared/types/keys';
import type { MedicalCollection } from '../../../shared/types/collections';
import { MedicalRepository } from './MedicalRepository';
import { medicalTypes } from '../../map/wiki/medical';

export class MedicalImporter implements Importer<MedicalKey, MedicalCollection>
{
  /**
  * Repository to access data storage.
  */
  public repository = new MedicalRepository;
  
  /**
  * Import to JSON files.
  */
  async json() {            
    this.repository.clearCollection();
    
    for (const medicalKey of Object.keys(medicalTypes)) {
      await this.repository.storeToJsonFile(<MedicalKey>medicalKey);
    }
    
    return this.repository.collection;
  }
  
  /**
  * Import to MongoDB
  */
  async mongo() {
    this.repository.clearCollection();
    
    for (const medical of Object.keys(medicalTypes)) {
      for (const medicalType of medicalTypes[<MedicalKey>medical]) {
        await this.repository.storeJsonFileToMongoDb(medical, medicalType);
      }
    }
    
    return this.repository.collection;
  }
}