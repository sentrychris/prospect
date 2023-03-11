import type { Sequelize } from 'sequelize';

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
}