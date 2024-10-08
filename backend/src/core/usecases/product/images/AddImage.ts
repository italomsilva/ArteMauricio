import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProductImage } from 'src/core/domain/entities/ProductImage';
import { ProductImageRepository } from 'src/core/domain/repositories/ProductImageRepository';
import { ProductRepository } from 'src/core/domain/repositories/ProductRepository';
import { Validator } from 'src/core/utils/validators/Validator';

@Injectable()
export class AddImageUseCase {
  constructor(
    @Inject('productRepository')
    private readonly productRepository: ProductRepository,
    @Inject('productImageRepository')
    private readonly productImageRepository: ProductImageRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const requiredfields = {
      fields: {
        productId: { require: true },
        imageUrl: { require: true },
        imageOrder: { require: true }
      },
    };
    Validator.validateInput(input, requiredfields);
    const product = await this.productRepository.findById(input.productId);
    if (!product) throw new NotFoundException('PRODUCT NOT FOUND');
    const productImages = await this.productImageRepository.findAll(
      input.productId,
    );
    if (productImages.length > 10)
      throw new InternalServerErrorException('Too many images for one product! Limit: 10');
    const newImage = await this.productImageRepository.create({
      productId: input.productId,
      url: input.imageUrl,
      order: input.imageOrder,
    });
    const hasSameOrder = productImages.some(
      (productImage) => productImage.order === newImage.order
    );
    if (hasSameOrder) throw new ConflictException('An image with this order already exists');
    try {
      await this.productImageRepository.save(newImage);
    } catch (error) {
      throw new InternalServerErrorException(`Data Save Error: ${error}`)
    }
    const sortedProductImages = productImages.sort((a, b) => a.order - b.order);
    return {
      result: sortedProductImages,
      totalResults: sortedProductImages.length,
    };
  }
}

type Input = {
  productId: string;
  imageUrl: string;
  imageOrder: number;
};

type Output = {
  result: ProductImage[];
  totalResults: number;
};
