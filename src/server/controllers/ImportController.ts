import type { Request, Response } from 'express';
import type { ImportKey } from '../../shared/types/keys';
import { DeviceImporter } from '../lib/device/DeviceImporter';
export default class ImportController
{
  protected import = {
    device: new DeviceImporter
  };
    
  async json(req: Request , res: Response) {
    try {
      const key = <unknown>req.params.key as ImportKey;
      const response = await this.import[key].json();
            
      res.status(201).send(response);
    } catch (error) {
      res.send(error).status(400);
    }
  }

  async mongo(req: Request, res: Response) {
    try {
      const key = <unknown>req.params.key as ImportKey;
      await this.import[key].mongo();

      res.send(201);
    } catch (error) {
      res.send(error).status(400);
    }
  }
}