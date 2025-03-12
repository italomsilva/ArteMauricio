import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from 'src/core/domain/entities/ProductImage';
import { ProductImageRepository } from 'src/core/domain/repositories/ProductImageRepository';
import { ProductImageSchema } from 'src/database/schemas/ProductImageSchema';
import { Repository } from 'typeorm';

@Injectable()
export class MySqlProductImagesRepository implements ProductImageRepository {
  constructor(
    @InjectRepository(ProductImageSchema)
    private productImagesRepository: Repository<ProductImage>,
  ) {}
  async findById(productImageId: number): Promise<ProductImage> {
    const result = await this.productImagesRepository.findOne({
      where: { id: productImageId },
    });
    return result;
  }
  async findByIdAndOrder(
    productId: string,
    imageOrder: number,
  ): Promise<ProductImage> {
    const result = await this.productImagesRepository.findOne({
      where: { productId: productId, order: imageOrder },
    });
    return result;
  }
  async create(input: any): Promise<ProductImage> {
    return await this.productImagesRepository.create({
      order: input.order,
      productId: input.productId,
      url: input.url,
    });
  }
  async findAll(productId: string): Promise<ProductImage[]> {
    return await this.productImagesRepository.find({
      where: { productId: productId },
      order: {
        order: 'ASC',
      },
    });
  }
  async update(
    productImageId: number,
    productImage: Partial<ProductImage>,
  ): Promise<void> {
    await this.productImagesRepository.update(
      { id: productImageId },
      productImage,
    );
  }
  async save(productImage: ProductImage): Promise<ProductImage> {
    return await this.productImagesRepository.save(productImage);
  }
  async delete(productImageId: number): Promise<any> {
    return await this.productImagesRepository.delete({ id: productImageId });
  }
}
