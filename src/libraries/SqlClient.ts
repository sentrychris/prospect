import { Sequelize } from 'sequelize';
import { SqlSettings } from 'src/interfaces/Settings';

export class SqlClient {
  public db: Sequelize;
  
  public sequelize = Sequelize;
  
  constructor(config: SqlSettings) {
    this.db = new Sequelize(config);
    

  }
}