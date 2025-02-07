import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/entities/Product';

@Injectable()
export class GetAllProductsUsecase {
  constructor(
    @Inject('productRepository')
    private readonly productRepository: ProductRepository,
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
