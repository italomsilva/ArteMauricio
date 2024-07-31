import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryUsecase } from 'src/core/usecases/product/CreateCategory';
import { DeleteCategoryUsecase } from 'src/core/usecases/product/DeleteCategory';
import { EditCategoryUsecase } from 'src/core/usecases/product/EditCategory';
import { GetAllProductsUsecase } from 'src/core/usecases/product/GetAllProducts';
import { GetProductUseCase } from 'src/core/usecases/product/GetProduct';

@Controller('products')
export class ProductController {
  constructor(
    private readonly getProductUseCase: GetProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUsecase,
  ) {}
  @Get(':id')
  async getProduct(@Param() params): Promise<any> {
    return await this.getProductUseCase.execute(params.id);
  }
  @Get('')
  async getAllProducts(): Promise<any> {
    return await this.getAllProductsUseCase.execute();
  }
}
