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
    const searchQuery = input.searchQuery? decodeURIComponent(input.searchQuery): null;
    const category = input.category? decodeURIComponent(input.category): null;
    const result = await this.productRepository.findAll(page, limit, searchQuery, category);
    return {
      result: result,
      totalResults: result.length,
    };
  }
}

type Input = {
  page: string;
  limit: string;
  searchQuery?:string;
  category?: string;
};

type Output = {
  result: Product[];
  totalResults: number;
};
