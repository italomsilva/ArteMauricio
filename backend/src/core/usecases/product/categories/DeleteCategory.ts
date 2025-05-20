import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from 'src/core/domain/repositories/CategoryRepository';
import { ProductCategoryRepository } from 'src/core/domain/repositories/ProductCategoryRepository';
import { Validator } from 'src/core/utils/validators/Validator';

@Injectable()
export class DeleteCategoryUsecase {
  constructor(
    @Inject('categoryRepository')
    private readonly categoryRepository: CategoryRepository,
    @Inject('productCategoryRepository')
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}
  async execute(input: Input): Promise<Output> {
    const requiredfields = {
      fields: {
        id: { require: true },
      },
    };
    Validator.validateInput(input, requiredfields);
    const category = await this.categoryRepository.findById(input.id);
    if (!category) throw new NotFoundException('Category Not Found');
    try {
      await this.categoryRepository.delete(input.id);
      await this.productCategoryRepository.deleteAllByCategoryName(
        category.name
      );
    } catch (error) {
      throw new InternalServerErrorException(`Data Delete Error: ${error}`);
    }
    return {
      sucess: true,
    };
  }
}

type Input = {
  id: number;
};

type Output = {
  sucess: boolean;
};
