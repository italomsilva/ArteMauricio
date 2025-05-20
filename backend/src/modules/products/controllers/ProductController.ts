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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
    @Query('search') search: string,
    @Query('category') category: string,
  ): Promise<any> {
    return await this.getAllProductsUseCase.execute({
      page,
      limit,
      searchQuery: search,
      category
    });
  }
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const input = {
      title: body.title,
      price: Number(body.price),
      description: body.description??'',
      mainPhoto: file??null,  
    }
    return await this.createProductUseCase.execute(input);
  }
  @Put('edit')
  @UseInterceptors(FileInterceptor('file'))
  async editProduct(
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const input = {
      productId: body.productId,
      title: body.title ?? null,
      price: body.price ?? null,
      description: body.description ?? null,
      mainPhoto: file ?? null,
    };
    return await this.editProductUseCase.execute(input);
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
