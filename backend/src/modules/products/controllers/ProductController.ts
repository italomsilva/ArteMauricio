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
import { GetAllProductsUsecase } from 'src/core/usecases/product/GetAllProducts';
import { GetProductUseCase } from 'src/core/usecases/product/GetProduct';
import { ProductCategoryFilterUseCase } from 'src/core/usecases/product/ProductCategoryFilter';

@Controller('products')
export class ProductController {
  constructor(
    private readonly getProductUseCase: GetProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUsecase,
    private readonly productCategoryFilterUseCase: ProductCategoryFilterUseCase,
  ) {}
  @Get(':id')
  async getProduct(@Param() params): Promise<any> {
    return await this.getProductUseCase.execute(params.id);
  }
  @Get('')
  async getAllProducts(): Promise<any> {
    return await this.getAllProductsUseCase.execute();
  }
  @Post('filter/categories')
  async filterByCategories(@Body() body):Promise<any>{
    return await this.productCategoryFilterUseCase.execute(body)
  }
}
