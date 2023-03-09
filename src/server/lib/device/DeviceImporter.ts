import type { Importer } from '../../../shared/interfaces/Importer';
import type { DeviceKey } from '../../../shared/types/keys';
import type { DeviceCollection } from '../../../shared/types/collections';
import { deviceTypes } from '../../map/wiki/deviceTypes';
import { DeviceRepository } from './DeviceRepository';

export class DeviceImporter implements Importer<DeviceKey, DeviceCollection>
{
  /**
  * Repository to access data storage.
  */
  public repository = new DeviceRepository;
  
  /**
  * Import to JSON files.
  */
  async json() {            
    this.repository.clearCollection();
    
    for (const key of Object.keys(deviceTypes)) {
      await this.repository.storeToJsonFile(<DeviceKey>key);
    }
    
    return this.repository.collection;
  }
  
  /**
  * Import to MongoDB
  */
  async mongo() {
    this.repository.clearCollection();
    
    for (const key of Object.keys(deviceTypes)) {
      for (const obj of deviceTypes[<DeviceKey>key]) {
        await this.repository.storeJsonFileToMongoDb(key, obj);
      }
    }
    
    return this.repository.collection;
  }
}