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
import { Product } from './product.model';

export interface ProductImageFields {
  id: number;
  product_id: number;
  image_url: string;
}

export type ProductImageCreationFields = Optional<ProductImageFields, 'id'>;

@Table
export class ProductImage extends Model<
  ProductImageFields,
  ProductImageCreationFields
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
  @Column
  image_url: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => Product)
  product: Product;
}
