import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class ProductFieldMapper {
  static FIELD_name = 'name';
  static FIELD_quantity = 'quantity';
  static FIELD_price = 'price';
}

// product fields expected in the create product request
export const ProductFields = [
  ProductFieldMapper.FIELD_name,
  ProductFieldMapper.FIELD_quantity,
  ProductFieldMapper.FIELD_price,
];

// product fields validations and transformations
export class CreateProductDto {
  @Expose({ name: ProductFieldMapper.FIELD_name })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose({ name: ProductFieldMapper.FIELD_quantity })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  quantity: number;

  @Expose({ name: ProductFieldMapper.FIELD_price })
  @IsNumber()
  @IsNotEmpty()
  @Min(0.0)
  price: number;
}
