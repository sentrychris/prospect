import type { ObjectId } from 'mongodb';
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

export interface UserDocument extends User {
  _id: ObjectId
}

export interface UserProjection {
  _id: number;
  name: number;
  email: number;
  password: number;
  createdAt: number;
  updatedAt: number;
}