import { Injectable } from '@nestjs/common';
import { Product, ProductCreationFields } from './entities/product.model';

@Injectable()
export class ProductRepository {
  async create(product: ProductCreationFields): Promise<Product> {
    return (await Product.create(product)).save();
  }

  async getAllByUserId(userId: number): Promise<Product[]> {
    return await Product.findAll({ where: { user_id: userId } });
  }

  async getOneByUserId(productId: number, userId: number): Promise<Product> {
    return await Product.findOne({ where: { id: productId, user_id: userId } });
  }
}
