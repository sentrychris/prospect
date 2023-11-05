import type { Dialect } from 'sequelize';
import type {
  RedisClusterNodeAddressMap,
  RedisNodeAddress,
  RedisNodeConnection
} from './Connection';

export interface AppSetting {
  [key: string]: string
}

export interface AppSettings {
  url: string;
  secret: string;
  port: string | number;
  path: string;
  version: string;
  sources: AppSetting;
  cacheTTL: number;
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
  models?: Array<string>;
}

export interface RedisClusterSettings {
  rootNodes: Array<RedisNodeAddress>;
  nodeAddressMap?: RedisClusterNodeAddressMap;
  defaults: RedisNodeConnection;
}

export interface Settings {
  app: AppSettings;
  mongo: MongoSettings;
  sql: SqlSettings;
  redis: {
    cluster: RedisClusterSettings;
  };
}