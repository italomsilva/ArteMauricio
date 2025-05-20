import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
import { AddProductCategoryUseCase } from 'src/core/usecases/product/categories/AddProductCategory';
  import { CreateCategoryUsecase } from 'src/core/usecases/product/categories/CreateCategory';
  import { DeleteCategoryUsecase } from 'src/core/usecases/product/categories/DeleteCategory';
import { DeleteProductCategoryUsecase } from 'src/core/usecases/product/categories/DeleteProductCategory';
  import { EditCategoryUsecase } from 'src/core/usecases/product/categories/EditCategory';
import { GetAllCategoriesUseCase } from 'src/core/usecases/product/categories/GetAllCategories';
import { GetAllProductCategoriesUseCase } from 'src/core/usecases/product/categories/getAllProductCategories';
  
  @Controller('categories')
  export class CategoryController {
    constructor(
      private readonly createCategoryUseCase: CreateCategoryUsecase,
      private readonly editCategoryUseCase: EditCategoryUsecase,
      private readonly deleteCategoryUseCase: DeleteCategoryUsecase,
      private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
      private readonly addProductCategoryUseCase:AddProductCategoryUseCase, 
      private readonly deleteProductCategoryUseCase:DeleteProductCategoryUsecase ,
      private readonly getAllProductCategoriesUseCase:GetAllProductCategoriesUseCase 
    ) {}
    @Get('')
    async GetAllCategories():Promise<any>{
        const result = await this.getAllCategoriesUseCase.execute();
        return result;  
    }
    @Post('create')
    async createCategory(@Body() body): Promise<any> {
      const result = await this.createCategoryUseCase.execute(body);
      return result;
    }
    @Put('edit')
    async editCategory(@Body() body): Promise<any> {
      const result = await this.editCategoryUseCase.execute(body);
      return result;
    }
    @Delete('delete')
    async deleteCategory(@Body() body): Promise<any> {
      const result = await this.deleteCategoryUseCase.execute(body);
      return result;
    }

    @Get('product/:productId')
    async getAllProductCategories(@Param() params):Promise<any>{
      const result = await this.getAllProductCategoriesUseCase.execute({productId: params.productId});
      return result;
    }

    @Delete('product/delete')
    async deleteProductCategory(@Body() body): Promise<any> {
      const result = await this.deleteProductCategoryUseCase.execute(body);
      return result;
    }

    @Post('product/add')
    async addProductCategory(@Body() body): Promise<any> {
      const result = await this.addProductCategoryUseCase.execute(body);
      return result;
    }

  
  }
  