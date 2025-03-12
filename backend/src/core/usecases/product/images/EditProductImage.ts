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
export class EditProductImageUseCase {
  constructor(
    @Inject('productImageRepository')
    private readonly productImageRepository: ProductImageRepository,
    @Inject('imageCloudGateway')
    private readonly imageCloudGateway: ImageCloudGateway,
  ) {}

  async execute(input: Input): Promise<Output> {
    const requiredfields = {
      fields: {
        productImageId: { require: true },
      },
    };
    Validator.validateInput(input, requiredfields);
    input.newOrder = Number(input.newOrder);
    try {
      const currentImage = await this.productImageRepository.findById(
        input.productImageId
      );
      const hasImageSameOrder =
        await this.productImageRepository.findByIdAndOrder(
          currentImage.productId,
          input.newOrder,
        );
      if (hasImageSameOrder) {
        await this.productImageRepository.delete(hasImageSameOrder.id);
        await this.imageCloudGateway.delete(
          currentImage.productId,
          hasImageSameOrder.id,
        );
      }
      if (input.file) {
        const url = await this.imageCloudGateway.upload(
          currentImage.productId,
          hasImageSameOrder.id,
          input.file,
        );
        currentImage.url = url;
      }
      await this.productImageRepository.update(currentImage.id, {
        url: currentImage.url,
        order: input.newOrder ?? currentImage.order,
      });
      return {
        sucess: true,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Data Save Error: ${error}`);
    }
  }
}
type Input = {
  productImageId: number;
  newOrder?: number;
  file?: Express.Multer.File;
};

type Output = {
  sucess: boolean;
};
