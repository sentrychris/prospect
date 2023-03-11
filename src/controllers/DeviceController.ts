import type { Request, Response } from 'express';
import type { Repository } from '../interfaces/Repository';
import type { Device } from '../interfaces/Device';
import { DeviceRepository } from '../repositories/DeviceRepository';

export default class DeviceController
{
  /**
   * Device data access
   */
  private repository: Repository<Device>  = new DeviceRepository;

  /**
   * List devices
   * 
   * @param req 
   * @param res 
   */
  async index(req: Request, res: Response) {
    try {
      const data = await this.repository.search(req);
      res.send(data);
    } catch (error) {
      res.send(error).status(400);
    }
  }

  /**
   * Show device
   * 
   * @param req 
   * @param res 
   */
  async show(req: Request, res: Response) {
    try {
      const result = await this.repository.get(req);
      res.send(result);
    } catch (error) {
      res.send(error).status(400);
    }
  }

  /**
   * Store device
   * 
   * @param req 
   * @param res 
   */
  async store(req: Request, res: Response) {
    try {
      const result = await this.repository.store(req.body);
      res.send(result);
    } catch (error) {
      res.send(error).status(400);
    }
  }
}