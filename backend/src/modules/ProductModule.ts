import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSchema } from '../database/schemas/ProductSchema';
import { MySqlProductRepository } from 'src/infra/repositories/MySqlProductRepository';
import { ProductController } from 'src/controllers/ProductController';
import { GetAllProductsUsecase } from 'src/core/usecases/GetAllProducts';
import { GetProductUseCase } from 'src/core/usecases/GetProduct';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSchema])],
  providers: [
    {
      provide:'productRepository',
      useClass: MySqlProductRepository
    },
    GetProductUseCase,
    GetAllProductsUsecase,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
