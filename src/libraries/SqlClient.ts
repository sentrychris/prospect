import { Sequelize } from 'sequelize-typescript';
import type { SqlConnection } from '../interfaces/Connection';
import type { SqlSettings } from '../interfaces/Settings';

export class SqlClient implements SqlConnection
{
  public db: Sequelize;
  
  public sequelize = Sequelize;
  
  constructor(config: SqlSettings) {
    this.db = new Sequelize(config);
    this.db.sync().then((db) => {
      this.connect(db);
    });
  }

  connect(db: Sequelize) {
    this.db = db;
  }
}