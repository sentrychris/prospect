import type { Importer } from "../../interfaces/Importer"
import type { Repository } from "../../interfaces/Repository"
import type { MedicalKey } from "../../types/keys"
import { MedicalRepository } from "./MedicalRepository"
import { medicalTypes } from "../map/wiki/medical"

export class MedicalImporter implements Importer<MedicalImporter>
{
    /**
     * Repository to access data storage
     */
    public repository: Repository<any> = new MedicalRepository

    /**
     * Import to JSON files.
     * 
     * @param key the medical type e.g. medical
     */
    async json(key?: unknown | null) {               
        this.repository.clearCollection()

        if (!key) {
            // If no key is provided, loop through all wiki map keys to process
            // all the data from all wiki pages related to medical
            for (const medicalKey of Object.keys(medicalTypes)) {
                await this.repository.storeToJsonFile(medicalKey)
            }

            // Return collection (multiple wiki pages = multiple representations)
            return this.repository.collection
        } else {
            // Otherwise just process the specified wiki page corresponding to
            // the wiki map key provided.
            return await this.repository.storeToJsonFile(<MedicalKey>key)
        }
    }
    
    /**
     * Import to MongoDB
     * 
     * @param key 
     */
    async mongo(key?: unknown | null) {
        this.repository.clearCollection()

        if (!key) {
            for (const medical of Object.keys(medicalTypes)) {
                for (const medicalType of medicalTypes[<MedicalKey>medical]) {
                    await this.repository.storeJsonFileToMongoDb(medicalType)
                }
            }
        } else {
            for (const medicalType of medicalTypes[<MedicalKey>key]) {
                await this.repository.storeJsonFileToMongoDb(medicalType)
            }
        }
        
        return this
    }
}