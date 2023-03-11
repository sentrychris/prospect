import { config } from 'dotenv';
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
};