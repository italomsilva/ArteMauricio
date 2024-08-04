import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProductCategoryRepository } from 'src/core/domain/repositories/ProductCategoryRepository';
import { ProductImageRepository } from 'src/core/domain/repositories/ProductImageRepository';
import { ProductRepository } from 'src/core/domain/repositories/ProductRepository';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject('productRepository')
    private readonly productRepository: ProductRepository,
    @Inject('productImageRepository')
    private readonly productImageRepository: ProductImageRepository,
    @Inject('productCategoryRepository')
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const product = await this.productRepository.findById(input.productId);
    const productCategories =
      await this.productCategoryRepository.findAllByProductId(input.productId);
    const productImages = await this.productImageRepository.findAll(
      input.productId,
    );
    if (!product) throw new NotFoundException('Product Not found');
    try {
      Promise.all([
        productCategories.map(
          async (productCategory) =>
            await this.productCategoryRepository.delete(productCategory.id),
        ),
        productImages.map(
          async (productImage) =>
            await this.productImageRepository.delete(productImage.id),
        ),
        await this.productRepository.delete(input.productId),
      ]);
      return {sucess: true}
    } catch (error) {
      throw new InternalServerErrorException(`Data Delete Error: ${error}`);
    }
  }
}

type Input = {
  productId: string;
};

type Output = {
  sucess: boolean
}