import { Device } from '../models/Device';

export interface User {
  name: string;
  email: string;
  password: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  devices?: Array<Device>
}

export interface UserAuth {
  id: number;
  email: string;
  iat: number;
  exp: number;
}