import { Inject, Injectable } from '@nestjs/common';
import { ProductImage } from 'src/core/domain/entities/ProductImage';
import { ProductImageRepository } from 'src/core/domain/repositories/ProductImageRepository';

@Injectable()
export class GetAllImagesByProductIdUseCase {
  constructor(
    @Inject('productImageRepository')
    private readonly productImageRepository: ProductImageRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const result = await this.productImageRepository.findAll(input.productId)
    return {
      result: result,
      totalResults: result.length,
    };
  }
}

type Input = {
    productId:string
};

type Output = {
  result: ProductImage[];
  totalResults: number;
};
