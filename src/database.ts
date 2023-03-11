import type { Collection } from 'mongodb';
import type { Connection } from './interfaces/Connection';
import { MongoClient } from './libraries/MongoClient';
// import { SqlClient } from './libraries/SqlClient';
import { settings } from  './config';

export const client: Connection<Collection> = new MongoClient(
  settings.mongo.cluster,
  settings.mongo.user,
  settings.mongo.password,
  settings.mongo.database
);

// const sqlClient: any = new SqlClient(settings.sql);

// console.log(sqlClient);