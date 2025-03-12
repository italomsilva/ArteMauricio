import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
    try {
      const productImage = await this.productImageRepository.findById(
        input.productImageId,
      );

      if (input.newOrder) {
        const hasImageSameOrder =
          await this.productImageRepository.findByIdAndOrder(
            productImage.productId,
            input.newOrder,
          );
        if (hasImageSameOrder && hasImageSameOrder.id != input.productImageId) {
          await this.productImageRepository.delete(hasImageSameOrder.id);
          await this.imageCloudGateway.delete(
            productImage.productId,
            hasImageSameOrder.id,
          );
        }
      }
      if (input.file) {
        const url = await this.imageCloudGateway.upload(
          productImage.productId,
          productImage.id,
          input.file,
        );
        productImage.url = url;
      }
      await this.productImageRepository.update(productImage.id, {
        url: productImage.url,
        order: input.newOrder ?? productImage.order,
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
