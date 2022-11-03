import { Optional } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from 'src/modules/users/entities/user.model';

export interface IUserRoleAttributes {
  id: number;
  name: string;
}

type IUserRoleCreationAttributes = Optional<IUserRoleAttributes, 'id'>;

@Table
export class UserRole extends Model<
  IUserRoleAttributes,
  IUserRoleCreationAttributes
> {
  @AutoIncrement
  @PrimaryKey
  @Unique
  @Column
  id: number;

  @AllowNull(false)
  @Unique
  @Column
  name: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => User)
  users: User[];
}
