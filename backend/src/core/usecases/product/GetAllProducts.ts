import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/entities/Product';

@Injectable()
export class GetAllProductsUsecase {
  constructor(
    @Inject('productRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const page = input.page? parseInt(input.page, 10): 1;
    const limit = input.limit? parseInt(input.limit, 10): 15;
    const result = await this.productRepository.findAll(page, limit);
    return {
      result: result,
      totalResults: result.length,
    };
  }
}

type Input = {
  page: string;
  limit: string;
};

type Output = {
  result: Product[];
  totalResults: number;
};
