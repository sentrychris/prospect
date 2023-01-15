import type { Request, Response } from 'express'
import type { ImportKey } from '../types/keys'
import type { Importer } from '../interfaces/Importer'
import { AmmoImporter } from '../lib/ammo/AmmoImporter'
import { MedicalImporter } from '../lib/medical/MedicalImporter'


export default class ImportController
{
    protected import: Record<ImportKey, Importer<any>>  = {
        ammo: new AmmoImporter,
        medical: new MedicalImporter,
    }
    
    async json(req: Request , res: Response) {
        try {
            const key = <unknown>req.query.key as ImportKey
            const response = await this.import[key].json(req.query.subKey)
            
            res.status(201).send(response)
        } catch (error) {
            console.log(error)
        }
    }

    async mongo(req: Request, res: Response) {
        try {
            const key = <unknown>req.query.key as ImportKey
            this.import[key].mongo(req.query.subKey)

            res.send(201)
        } catch (error) {
            console.log(error)
        }
    }
}