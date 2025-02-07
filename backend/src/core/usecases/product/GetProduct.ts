import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { ProductImageRepository } from 'src/core/domain/repositories/ProductImageRepository';
import { ProductCategoryRepository } from 'src/core/domain/repositories/ProductCategoryRepository';
import { productFormatter } from 'src/core/utils/formatters/ProductFormatter';
import { CategoryRepository } from 'src/core/domain/repositories/CategoryRepository';
@Injectable()
export class GetProductUseCase {
  constructor(
    @Inject('productRepository')
    private readonly productRepository: ProductRepository,
    @Inject('productImageRepository')
    private readonly productImageRepository: ProductImageRepository,
    @Inject('productCategoryRepository')
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  async execute(productId: string): Promise<Output> {
    const product = await this.productRepository.findById(productId);
    if (!product) throw new NotFoundException('PRODUCT NOT FOUND');
    const productCategories =
      await this.productCategoryRepository.findAllByProductId(productId);
    const productImages = await this.productImageRepository.findAll(product.id);
    return productFormatter({
      product,
      categories: productCategories,
      images: productImages,
    });
  }
}

type Output = {
  id: string;
  title: string;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  mainPhoto: string;
  categories: string[];
  images: {
    url: string;
    order: number;
  }[];
};
