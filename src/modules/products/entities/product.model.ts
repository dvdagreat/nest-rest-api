import { Optional } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  HasMany,
  IsFloat,
  Min,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from 'src/modules/users/entities/user.model';
import { ProductImage } from './product-image.model';
import { ProductLike } from './product-like.model';

export interface ProductFields {
  id: number;
  user_id: number;
  name: string;
  quantity: number;
  price: number;
}

export type ProductCreationFields = Optional<ProductFields, 'id'>;

@Table
export class Product extends Model<ProductFields, ProductCreationFields> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Unique
  @Column
  id: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Min(0)
  @Column
  quantity: number;

  @AllowNull(false)
  @Min(0.0)
  @IsFloat
  @Column
  price: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => User)
  owner: User;

  @HasMany(() => ProductImage)
  images: Product[];

  @HasMany(() => ProductLike)
  likes: ProductLike[];
}
