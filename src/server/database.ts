import { Collection } from 'mongodb';
import { MongoClient } from './lib/MongoClient';
import { settings } from  './config';
import type { Connection } from '../shared/interfaces/Connection';

export const client: Connection<Collection> = new MongoClient(
  settings.mongo.cluster,
  settings.mongo.user,
  settings.mongo.password,
  settings.mongo.database
);