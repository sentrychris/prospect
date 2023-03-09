import type { Request, Response } from 'express';
import type { ImportKey } from '../types/keys';
import { DeviceImporter } from '../lib/device/DeviceImporter';

export default class ImportController
{
  protected import = {
    device: new DeviceImporter
  };

  async mongo(req: Request, res: Response) {
    try {
      const key = <unknown>req.params.key as ImportKey;
      const response = await this.import[key].mongo(req);

      res.send(response).status(201);
    } catch (error) {
      res.send(error).status(400);
    }
  }
}