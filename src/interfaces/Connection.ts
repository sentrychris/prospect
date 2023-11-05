import type { Sequelize } from 'sequelize-typescript';

export interface MongoConnection<T> {
  getCollection: (collection: string) => Promise<T>;
  closeConnection: () => void;
}

export interface SqlConnection {
  db: Sequelize;
  connect(db: Sequelize): void;
}

export interface RedisNodeConnection {
  username: string;
  password: string;
  db: number;
  tls: object | undefined;
}

export interface RedisNodeAddress {
  host: string;
  port: number;
}

export interface RedisClusterNodeAddressMap {
  [key: string]: RedisNodeAddress
}
