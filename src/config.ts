import { config } from 'dotenv';
import type { Dialect } from 'sequelize';
import type { Settings } from './interfaces/Settings';
import { APP_VERSION } from './version';

config({
  debug: process.env.DEBUG ? true : false
});

export const settings: Settings = {
  app: {
    url: process.env.APP_URL ?? '',
    port: process.env.APP_PORT ?? 3001,
    secret: process.env.APP_SECRET ?? '',
    path: '',
    version: APP_VERSION,
    sources: {}
  },
  mongo: {
    cluster: process.env.MONGO_CLUSTER ?? '',
    user: process.env.MONGO_USER ?? '',
    password: process.env.MONGO_PASSWORD ?? '',
    database: process.env.MONGO_DATABASE ?? ''
  },
  sql: {
    dialect: <unknown>process.env.SQL_DIALECT as Dialect ?? 'mariadb',
    host: process.env.SQL_HOST ?? '',
    port: parseInt(process.env.SQL_PORT ?? '3306'),
    username: process.env.SQL_USERNAME ?? '',
    password: process.env.SQL_PASSWORD ?? '',
    database: process.env.SQL_DATABASE ?? '',
    models: [__dirname + '/models']
  }
};