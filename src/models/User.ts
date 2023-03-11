import * as bcrypt from 'bcrypt';
import { CreationOptional, NonAttribute } from 'sequelize';
import { Table, Column, Model, CreatedAt, UpdatedAt, BeforeUpdate, BeforeCreate } from 'sequelize-typescript';

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

  @BeforeCreate
  static async hashPassword(instance: User) {
    const salt = await bcrypt.genSalt(10);
    instance.password = await bcrypt.hash(instance.password, salt);
  }

  static verifyPassword(password: string, instance: User) {
    return bcrypt.compareSync(password, instance.password);
  }

  get fullName(): NonAttribute<string> {
    return this.name;
  }
}