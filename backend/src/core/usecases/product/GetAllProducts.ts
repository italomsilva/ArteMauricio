import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/entities/Product';
import { ProductImageRepository } from 'src/core/domain/repositories/ProductImageRepository';
import { ProductCategoryRepository } from 'src/core/domain/repositories/ProductCategoryRepository';

@Injectable()
export class GetAllProductsUsecase {
  constructor(
    @Inject('productRepository')
    private readonly productRepository: ProductRepository,
    @Inject('productImageRepository')
    private readonly productImageRepository: ProductImageRepository,
    @Inject('productCategoryRepository')
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  async execute(): Promise<Output> {
    const result = await this.productRepository.findAll();
    return {
      result: result,
      totalResults: result.length,
    };
  }
}

type Output = {
  result: Product[];
  totalResults: number;
};
