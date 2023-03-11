import { CreationOptional } from 'sequelize';
import { Table, Column, ForeignKey, BelongsTo, AllowNull, Model, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { User } from './User';

@Table({
  tableName: 'devices',
  underscored: true
})
export class Device extends Model<Device> {
  @ForeignKey(() => User)
  @Column
  declare userId: number;

  @AllowNull(false)
  @Column
  declare hwid: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;

  @BelongsTo(() => User)
  declare user: User;
}