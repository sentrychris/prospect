import * as bcrypt from 'bcrypt';
import { CreationOptional, NonAttribute } from 'sequelize';
import { Table, Column, HasMany, AllowNull, Model, CreatedAt, UpdatedAt, BeforeCreate } from 'sequelize-typescript';
import { Device } from './Device';

@Table({
  tableName: 'users',
  underscored: true
})
export class User extends Model<User> {
  @AllowNull(false)
  @Column
  declare name: string;

  @AllowNull(false)
  @Column
  declare email: string;

  @AllowNull(false)
  @Column
  declare password: string;

  @AllowNull
  @Column
  declare token: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;

  @HasMany(() => Device)
  declare devices: Device[];

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