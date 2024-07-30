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

@Controller('')
export class ProductController {
  constructor(
    private readonly getProductUseCase: GetProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUsecase,
    private readonly createCategoryUseCase: CreateCategoryUsecase,
    private readonly editCategoryUseCase: EditCategoryUsecase,
    private readonly deleteCategoryUseCase: DeleteCategoryUsecase,
  ) {}
  @Get('products/:id')
  async getProduct(@Param() params): Promise<any> {
    return await this.getProductUseCase.execute(params.id);
  }
  @Get('products')
  async getAllProducts(): Promise<any> {
    return await this.getAllProductsUseCase.execute();
  }
  @Post('categories/create')
  async createCategory(@Body() body): Promise<any> {
    const result = await this.createCategoryUseCase.execute(body);
    return result;
  }
  @Put('categories/edit')
  async editCategory(@Body() body): Promise<any> {
    const result = await this.editCategoryUseCase.execute(body);
    return result;
  }
  @Delete('categories/delete')
  async deleteCategory(@Body() body): Promise<any> {
    const result = await this.deleteCategoryUseCase.execute(body);
    return result;
  }

}
