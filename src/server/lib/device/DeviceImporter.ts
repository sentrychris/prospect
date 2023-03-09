import type { Request } from 'express';
import type { Importer } from '../../interfaces/Importer';
import type { Device } from '../../interfaces/resource/Device';
import { DeviceRepository } from './DeviceRepository';

export class DeviceImporter implements Importer<Device>
{
  /**
  * Repository to access data storage.
  */
  public repository = new DeviceRepository;
  
  /**
  * Import to MongoDB
  */
  async mongo(req: Request) {

    this.repository.clearCollection();
    
    await this.repository.mongo(req.body);
    
    return this.repository.collection;
  }
}