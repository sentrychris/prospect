import type { ObjectId } from 'mongodb';

export interface User {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
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