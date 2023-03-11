import type { Sequelize } from 'sequelize-typescript';

export interface MongoConnection<T> {
  cluster: string;
  username: string;
  password: string;
  database: string;
  getCollection: (collection: string) => Promise<T>;
  closeConnection: () => void;
}

export interface SqlConnection {
  db: Sequelize;
  connect(db: Sequelize): void;
}