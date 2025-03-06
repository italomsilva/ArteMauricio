import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProductUseCase } from 'src/core/usecases/product/CreateProduct';
import { DeleteProductUseCase } from 'src/core/usecases/product/DeleteProduct';
import { EditProductUseCase } from 'src/core/usecases/product/EditProduct';
import { GetAllProductsUsecase } from 'src/core/usecases/product/GetAllProducts';
import { GetProductUseCase } from 'src/core/usecases/product/GetProduct';
import { ProductCategoryFilterUseCase } from 'src/core/usecases/product/categories/ProductCategoryFilter';

@Controller('products')
export class ProductController {
  constructor(
    private readonly getProductUseCase: GetProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUsecase,
    private readonly productCategoryFilterUseCase: ProductCategoryFilterUseCase,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly editProductUseCase: EditProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}
  @Get(':id')
  async getProduct(@Param() params): Promise<any> {
    return await this.getProductUseCase.execute(params.id);
  }
  @Get('')
  async getAllProducts(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search:string,
  ): Promise<any> {
    return await this.getAllProductsUseCase.execute({ page, limit, searchQuery: search });
  }
  @Post('create')
  async createProduct(@Body() body): Promise<any> {
    return await this.createProductUseCase.execute(body);
  }
  @Put('edit')
  async editProduct(@Body() body): Promise<any> {
    return await this.editProductUseCase.execute(body);
  }
  @Delete('delete')
  async deleteProduct(@Body() body): Promise<any> {
    return await this.deleteProductUseCase.execute(body);
  }
  @Post('filter/categories')
  async filterByCategories(@Body() body): Promise<any> {
    return await this.productCategoryFilterUseCase.execute(body);
  }
}
