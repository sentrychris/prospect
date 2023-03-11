import { config } from 'dotenv';
import type { Dialect } from 'sequelize';
import type { Settings } from './interfaces/Settings';

config({
  debug: process.env.DEBUG ? true : false
});

export const settings: Settings = {
  version: process.env.VERSION_CONSTRAINT ?? 'dev',
  app: {
    url: process.env.APP_URL ?? '',
    port: process.env.APP_PORT ?? 3001,
    secret: process.env.APP_SECRET ?? '',
    path: '',
    sources: {}
  },
  docs: {
    port: process.env.DOCS_PORT ?? 3001,
    schema: process.env.API_SCHEMA ?? 'swagger.json'
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
    username: process.env.SQL_USER ?? '',
    password: process.env.SQL_PASSWORD ?? '',
    database: process.env.SQL_DATABASE ?? '',
    // pool: {
    //   acquire: <unknown>process.env.SQL_ACQUIRE as number,
    //   idle: <unknown>process.env.SQL_ACQUIRE as number,
    //   max: <unknown>process.env.SQL_ACQUIRE as number,
    //   min: <unknown>process.env.SQL_MIN as number
    // }
  }
};