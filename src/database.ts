import type { Collection } from 'mongodb';
import type { MongoConnection, SqlConnection } from './interfaces/Connection';
import { MongoClient } from './libraries/MongoClient';
import { SqlClient } from './libraries/SqlClient';
import { settings } from  './config';

export const mongoClient: MongoConnection<Collection> = new MongoClient(
  settings.mongo.cluster,
  settings.mongo.user,
  settings.mongo.password,
  settings.mongo.database
);

export const sqlClient: SqlConnection = new SqlClient(settings.sql);
