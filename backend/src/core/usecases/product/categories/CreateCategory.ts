import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Category } from 'src/core/domain/entities/Category';
import { CategoryRepository } from 'src/core/domain/repositories/CategoryRepository';

@Injectable()
export class CreateCategoryUsecase {
  constructor(
    @Inject('categoryRepository')
    private readonly categoryRepository: CategoryRepository,
  ) {}
  async execute(input: Input): Promise<Category> {
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
      throw new InternalServerErrorException(error);
    }
    return newCategory;
  }
}

type Input = {
  categoryName: string;
};

