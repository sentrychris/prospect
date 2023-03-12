import { User } from '../models/User';

export interface Device {
  hwid: string;
  user: User
}

export interface DeviceQuery {
  where: {
    userId: number;
    hwid?: {
      [key: string]: string;
    }
  }
}