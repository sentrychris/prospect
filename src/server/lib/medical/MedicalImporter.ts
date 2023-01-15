import { Importer } from "../../interfaces/Importer"
import { Repository } from "../../interfaces/Repository"
import { MedicalKey } from "../../types/keys"
import { MedicalRepository } from "./MedicalRepository"
import { medicalTypes } from "../map/wiki/medical"

export class MedicalImporter implements Importer<MedicalImporter>
{
    /**
     * Repository to access data storage
     */
    public repository: Repository<any> = new MedicalRepository

    /**
     * Import to JSON files
     * 
     * @param key the ammo type e.g. pistol, shotgun
     */
    async json(key?: unknown | null) {               
        this.repository.clearCollection()

        if (!key) {           
            for (const medicalKey of Object.keys(medicalTypes)) {
                await this.repository.storeToJsonFile(medicalKey)
            }

            return this.repository.collection
        } else {
            return await this.repository.storeToJsonFile(<MedicalKey>key)
        }
    }
    
    /**
     * Import to Mongo
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