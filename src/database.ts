import type { Collection } from 'mongodb';
import type { MongoConnection, SqlConnection } from './interfaces/Connection';
import { MongoClient } from './libraries/MongoClient';
import { SqlClient } from './libraries/SqlClient';
import { settings } from  './config';
import { User } from './models/User';

export const mongoClient: MongoConnection<Collection> = new MongoClient(
  settings.mongo.cluster,
  settings.mongo.user,
  settings.mongo.password,
  settings.mongo.database
);

export const sqlClient: SqlConnection = new SqlClient(settings.sql);

try {
  sqlClient.db.authenticate();
  sqlClient.db.sync().then(() => {
    //@ts-ignore
    const user = User.build({
      name: 'Chris Rowles',
      email: 'me@rowles.ch',
      password: 'Passw0rd!'
    })

    user.save();
  });

  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}