import { Inject, Injectable } from '@nestjs/common';
import { ProductCategory } from 'src/core/domain/entities/ProductCategory';
import { ProductCategoryRepository } from 'src/core/domain/repositories/ProductCategoryRepository';

@Injectable()
export class GetAllProductCategoriesUseCase {
  constructor(
    @Inject('productCategoryRepository')
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const productCategories =
      await this.productCategoryRepository.findAllByProductId(input.productId);
    return { result: productCategories, totalResults: 0 };
  }
}
type Input = {
  productId: string;
};

type Output = {
  result: ProductCategory[];
  totalResults: number;
};
