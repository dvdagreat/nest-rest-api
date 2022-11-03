import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductObject } from './decorators/product-object.decorator';
import { CreateProductDto } from './dto/product-dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { JwtUser } from '../users/decorators/jwt-user.decorator';
import { JwtUserDto } from '../users/dto/jwt-user.dto';
// import { Request as Req } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new ValidationPipe({ transform: true, validateCustomDecorators: true }),
  )
  @Post()
  async create(
    @CreateProductObject() product: CreateProductDto,
    @JwtUser() user: JwtUserDto,
  ) {
    return await this.productsService.createProduct(product, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAll(@JwtUser() user: JwtUserDto) {
    return await this.productsService.getAllByUserId(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id([0-9]+)')
  async getOne(@Param('id') id: number, @JwtUser() user: JwtUserDto) {
    return await this.productsService.getOneByUserId(id, user.id);
  }
}
