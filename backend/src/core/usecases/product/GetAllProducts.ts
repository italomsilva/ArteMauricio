import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/entities/Product';
import { ProductImageRepository } from 'src/core/domain/repositories/ProductImageRepository';
import { ProductCategoryRepository } from 'src/core/domain/repositories/ProductCategoryRepository';
import { productFormatter } from 'src/core/utils/formatters/ProductFormatter';

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

  async execute(): Promise<any> {
    const products = await this.productRepository.findAll();
    const result = await Promise.all(
      products.map(async (product) => {
        var productImages = await this.productImageRepository.findAll(product.id);
        var productCategories = await this.productCategoryRepository.findAllByProductId(product.id);
        return productFormatter({
          product: product,
          categories: productCategories,
          images: productImages,
        });
      }),
    );
    return { result: result };
  }
}
