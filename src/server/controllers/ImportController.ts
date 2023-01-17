import type { Request, Response } from 'express';
import type { ImportKey } from '../types/keys';
import { AmmoImporter } from '../lib/ammo/AmmoImporter';
import { ArmorImporter } from '../lib/armor/ArmorImporter';
import { MedicalImporter } from '../lib/medical/MedicalImporter';
import { ProvisionsImporter } from '../lib/provisions/ProvisionsImporter';
import { BackpacksImporter } from '../lib/backpacks/BackpacksImporter';
import { QuestsImporter } from '../lib/quests/QuestsImporter';


export default class ImportController
{
    protected import = {
        ammo: new AmmoImporter,
        armor: new ArmorImporter,
        backpacks: new BackpacksImporter,
        medical: new MedicalImporter,
        provisions: new ProvisionsImporter,
        quests: new QuestsImporter
    };
    
    async json(req: Request , res: Response) {
        try {
            const key = <unknown>req.params.key as ImportKey;
            const response = await this.import[key].json(req.params.subKey);
            
            res.status(201).send(response);
        } catch (error) {
            res.send(error).status(400);

            //

        }
    }

    async mongo(req: Request, res: Response) {
        try {
            const key = <unknown>req.params.key as ImportKey;
            this.import[key].mongo(req.params.subKey);

            res.send(201);
        } catch (error) {
            res.send(error).status(400);
        }
    }
}