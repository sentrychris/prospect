import { CreationOptional, NonAttribute } from 'sequelize';
import { Table, Column, Model, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'users'
})
export class User extends Model<User> {
  @Column
  declare name: string;

  @Column
  declare email: string;

  @Column
  declare password: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;

  get fullName(): NonAttribute<string> {
    return this.name;
  }
}