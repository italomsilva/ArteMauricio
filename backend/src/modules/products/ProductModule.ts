import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSchema } from '../../database/schemas/ProductSchema';
import { MySqlProductRepository } from 'src/infra/repositories/MySqlProductRepository';
import { GetProductUseCase } from 'src/core/usecases/product/GetProduct';
import { ProductController } from './controllers/ProductController';
import { GetAllProductsUsecase } from 'src/core/usecases/product/GetAllProducts';
import { MySqlCategoryRepository } from 'src/infra/repositories/MySqlCategoryRepository';
import { CategorySchema } from 'src/database/schemas/CategorySchema';
import { MySqlProductImagesRepository } from 'src/infra/repositories/MySqlProductImageRepository';
import { ProductImageSchema } from 'src/database/schemas/ProductImageSchema';
import { ProductCategorySchema } from 'src/database/schemas/ProductCategorySchema';
import { MySqlProductCategoryRepository } from 'src/infra/repositories/MySqlProductCategoryRepository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSchema,CategorySchema, ProductImageSchema, ProductCategorySchema])],
  providers: [
    {
      provide:'productRepository',
      useClass: MySqlProductRepository
    },
    {
      provide:'categoryRepository',
      useClass: MySqlCategoryRepository
    },
    {
      provide:'productImageRepository',
      useClass: MySqlProductImagesRepository
    },
    {
      provide:'productCategoryRepository',
      useClass: MySqlProductCategoryRepository
    },
    GetProductUseCase,
    GetAllProductsUsecase,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
