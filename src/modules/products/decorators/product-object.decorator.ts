import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CreateProductDto, ProductFields } from '../dto/product-dto';

export const CreateProductObject = createParamDecorator(
  (data: any, ctx: ExecutionContext): Partial<CreateProductDto> => {
    const request = ctx.switchToHttp().getRequest();

    const product = {};
    ProductFields.forEach(
      (value: string) => (product[value] = request.body[value]),
    );

    return product;
  },
);
