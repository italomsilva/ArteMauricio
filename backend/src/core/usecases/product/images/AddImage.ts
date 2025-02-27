import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProductImage } from 'src/core/domain/entities/ProductImage';
import { ImageCloudGateway } from 'src/core/domain/gateways/ImageCloudGateway';
import { ProductImageRepository } from 'src/core/domain/repositories/ProductImageRepository';
import { Validator } from 'src/core/utils/validators/Validator';

@Injectable()
export class AddImageUseCase {
  constructor(
    @Inject('productImageRepository')
    private readonly productImageRepository: ProductImageRepository,
    @Inject('imageCloudGateway')
    private readonly imageCloudGateway: ImageCloudGateway,
  ) {}

  async execute(input: Input): Promise<Output> {
    const requiredfields = {
      fields: {
        productId: { require: true },
        imageOrder: { require: true },
        file: { require: true },
      },
    };
    Validator.validateInput(input, requiredfields);
    input.imageOrder = Number(input.imageOrder);
    try {
      var productImages = await this.productImageRepository.findAll(
        input.productId,
      );

      if (productImages.length == 0) {
        const newImage = await this.uploadProductImage(input);
        return {
          result: [newImage],
          totalResults: 1,
        };
      }
      const existingImage = productImages.find(
        (img) => img.order === input.imageOrder,
      );
      if (existingImage) {
        await this.imageCloudGateway.delete(input.productId, input.imageOrder);
        await this.productImageRepository.delete(existingImage.id);
        productImages = productImages.filter(
          (img) => img.order !== input.imageOrder,
        );
      }
      const newImage = await this.uploadProductImage(input);
      productImages = [...productImages, newImage];
      const sortedProductImages = productImages.sort(
        (a, b) => a.order - b.order,
      );
      return {
        result: sortedProductImages,
        totalResults: sortedProductImages.length,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Data Save Error: ${error}`);
    }
  }

  private async uploadProductImage(input: Input): Promise<ProductImage> {
    const imageUrl = await this.imageCloudGateway.upload(
      input.productId,
      input.imageOrder,
      input.file,
    );
    if (!imageUrl)
      throw new InternalServerErrorException('Cloud Upload Error!');
    const newImage = await this.productImageRepository.create({
      productId: input.productId,
      url: imageUrl,
      order: input.imageOrder,
    });
    return await this.productImageRepository.save(newImage);
  }
}

type Input = {
  productId: string;
  imageOrder: number;
  file: Express.Multer.File;
};

type Output = {
  result: ProductImage[];
  totalResults: number;
};
