import type { Collection } from 'mongodb';
import type { MongoConnection, SqlConnection } from './interfaces/Connection';
import { Mongo } from './libraries/Mongo';
import { Database } from './libraries/Database';
import { settings } from  './config';

export const mongo: MongoConnection<Collection> = new Mongo(
  settings.mongo.cluster,
  settings.mongo.user,
  settings.mongo.password,
  settings.mongo.database
);

export const sql: SqlConnection = new Database(settings.sql);
