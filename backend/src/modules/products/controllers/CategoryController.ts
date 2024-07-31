import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Put,
  } from '@nestjs/common';
  import { CreateCategoryUsecase } from 'src/core/usecases/product/CreateCategory';
  import { DeleteCategoryUsecase } from 'src/core/usecases/product/DeleteCategory';
  import { EditCategoryUsecase } from 'src/core/usecases/product/EditCategory';
import { GetAllCategoriesUseCase } from 'src/core/usecases/product/GetAllCategories';
  
  @Controller('categories')
  export class CategoryController {
    constructor(
      private readonly createCategoryUseCase: CreateCategoryUsecase,
      private readonly editCategoryUseCase: EditCategoryUsecase,
      private readonly deleteCategoryUseCase: DeleteCategoryUsecase,
      private readonly GetAllCategoriesUseCase: GetAllCategoriesUseCase,
    ) {}
    @Get('')
    async GetAllCategories():Promise<any>{
        const result = await this.GetAllCategoriesUseCase.execute();
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
  
  }
  