import { Database } from './libraries/Database';
import { Mongo } from './libraries/Mongo';
import { Redis } from './libraries/Redis';
import { settings } from  './config';

export const sql = new Database(
  settings.sql
);

export const redis = new Redis();

export const mongo = new Mongo(
  settings.mongo.cluster,
  settings.mongo.user,
  settings.mongo.password,
  settings.mongo.database
);
