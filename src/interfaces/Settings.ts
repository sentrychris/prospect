import type { Dialect } from 'sequelize';

export interface AppSetting {
  [key: string]: string
}

export interface AppSettings {
  url: string;
  secret: string;
  port: string | number;
  path: string;
  sources: AppSetting;
}

export interface MongoSettings {
  cluster: string;
  user: string;
  password: string;
  database: string;
}

export interface SqlSettings {
  dialect: Dialect;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  pool?: {
    acquire: number;
    idle: number;
    max: number;
    min: number;
  }
}

export interface Settings {
  version: string
  app: AppSettings;
  docs: {
    port: string | number;
    schema: string;
  };
  mongo: MongoSettings;
  sql: SqlSettings;
}