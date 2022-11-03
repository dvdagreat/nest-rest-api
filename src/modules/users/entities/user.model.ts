import { Optional } from 'sequelize';
import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  ForeignKey,
  Table,
  Unique,
  BelongsTo,
  AllowNull,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { UserRole } from 'src/modules/user-roles/entities/user-role.model';
import { UserDetails } from './user-detail.model';

export interface IUserAccountFields {
  id: number;
  username: string;
  password: string;
  email: string;
}

export type IUserAccountCreateFields = Optional<IUserAccountFields, 'id'>;

@Table
export class User extends Model<IUserAccountFields, IUserAccountCreateFields> {
  @AutoIncrement
  @PrimaryKey
  @Unique
  @Column
  id: number;

  @AllowNull(false)
  @Unique
  @Column
  username: string;

  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @ForeignKey(() => UserRole)
  @Column
  role_id: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => UserDetails)
  details: UserDetails;

  @BelongsTo(() => UserRole)
  userRole: UserRole;
}
