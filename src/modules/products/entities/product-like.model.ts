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
import { User } from 'src/modules/users/entities/user.model';
import { Product } from './product.model';

export interface ProductLikeFields {
  id: number;
  product_id: number;
  user_id: number;
}

export type ProductLikeCreationFields = Optional<ProductLikeFields, 'id'>;

@Table
export class ProductLike extends Model<
  ProductLikeFields,
  ProductLikeCreationFields
> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column
  id: number;

  @AllowNull(false)
  @ForeignKey(() => Product)
  @Column
  product_id: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => User)
  users: User[];
}
