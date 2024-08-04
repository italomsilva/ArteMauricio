import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Category } from 'src/core/domain/entities/Category';
import { CategoryRepository } from 'src/core/domain/repositories/CategoryRepository';
import { Validator } from 'src/core/utils/validators/Validator';

@Injectable()
export class CreateCategoryUsecase {
  constructor(
    @Inject('categoryRepository')
    private readonly categoryRepository: CategoryRepository,
  ) {}
  async execute(input: Input): Promise<Output> {
    const requiredfields = {fields:{
      categoryName:{require: true}
    }};
    Validator.validateInput(input, requiredfields);
    const category = await this.categoryRepository.findByName(
      input.categoryName,
    );
    if (category) throw new ConflictException('Category alreads exists');
    const newCategory = await this.categoryRepository.create(
      input.categoryName,
    );
    try {
      await this.categoryRepository.save(newCategory);
    } catch (error) {
      throw new InternalServerErrorException(`Data Save Error: ${error}`);
    }
    return {result: newCategory};
  }
}

type Input = {
  categoryName: string;
};
type Output = {
  result: Category;
}


