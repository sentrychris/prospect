import type { Importer } from '../../../shared/interfaces/Importer';
import type { MapsKey } from '../../../shared/types/keys';
import type { MapsCollection } from '../../../shared/types/collections';
import { MapsRepository } from './MapsRepository';
import { mapsTypes } from '../../map/wiki/maps';

export class MapsImporter implements Importer<MapsKey, MapsCollection>
{
    /**
  * Repository to access data storage.
  */
    public repository = new MapsRepository;
  
    /**
  * Import to JSON files.
  */
    async json() {            
        this.repository.clearCollection();
    
        for (const mapKey of Object.keys(mapsTypes)) {
            await this.repository.storeToJsonFile(<MapsKey>mapKey);
        }
    
        return this.repository.collection;
    }
  
    /**
  * Import to MongoDB
  */
    async mongo() {
        this.repository.clearCollection();
    
        for (const map of Object.keys(mapsTypes)) {
            for (const mapType of mapsTypes[<MapsKey>map]) {
                await this.repository.storeJsonFileToMongoDb(map, mapType);
            }
        }
    
        return this.repository.collection;
    }
}