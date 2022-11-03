import { Optional } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from './user.model';

export interface IUserDetailsFields {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
}

export type IUserDetailsCreateFields = Optional<IUserDetailsFields, 'id'>;

@Table
export class UserDetails extends Model<
  IUserDetailsFields,
  IUserDetailsCreateFields
> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column
  id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  user_id: number;

  @AllowNull(false)
  @Column
  first_name: string;

  @AllowNull(false)
  @Column
  last_name: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => User)
  user: User;
}
