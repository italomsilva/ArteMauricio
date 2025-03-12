import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ImageCloudGateway } from 'src/core/domain/gateways/ImageCloudGateway';
import { ProductImageRepository } from 'src/core/domain/repositories/ProductImageRepository';
import { Validator } from 'src/core/utils/validators/Validator';

@Injectable()
export class DeleteImageUseCase {
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
      },
    };
    Validator.validateInput(input, requiredfields);
    const productImage = await this.productImageRepository.findByIdAndOrder(
      input.productId,
      input.imageOrder,
    );
    if (!productImage) throw new NotFoundException('Image Not Found');
    if (productImage.url) {
      await this.imageCloudGateway.delete(input.productId, productImage.id);
    }
    try {
      await this.productImageRepository.delete(productImage.id);
      return { sucess: true };
    } catch (error) {
      throw new InternalServerErrorException(`Data Delete Error: ${error}`);
    }
  }
}

type Input = {
  productId: string;
  imageOrder: number;
};
type Output = {
  sucess: boolean;
};
