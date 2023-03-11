import { User } from '../models/User';

export interface Device {
  hwid: string;
  user: User
}