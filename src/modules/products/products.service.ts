import { Injectable } from '@nestjs/common';
import { JwtUserDto } from '../users/dto/jwt-user.dto';
import { CreateProductDto } from './dto/product-dto';
import { Product } from './entities/product.model';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductsService {
  constructor(private productRepository: ProductRepository) {}

  async getAllByUserId(userId: number): Promise<Product[]> {
    return await this.productRepository.getAllByUserId(userId);
  }

  async createProduct(
    product: CreateProductDto,
    user: JwtUserDto,
  ): Promise<Product> {
    const productObj = {
      ...product,
      user_id: user.id,
    };
    return await this.productRepository.create(productObj);
  }

  async getOneByUserId(productId: number, userId: number) {
    return await this.productRepository.getOneByUserId(productId, userId);
  }
}
