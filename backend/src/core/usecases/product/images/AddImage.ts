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
      const hasImageSameOrder =
        await this.productImageRepository.findByIdAndOrder(
          input.productId,
          input.imageOrder,
        );

      if (hasImageSameOrder) {
        const imageUrl = await this.imageCloudGateway.upload(
          input.productId,
          hasImageSameOrder.id,
          input.file,
        );

        if (!imageUrl)
          throw new InternalServerErrorException('Cloud Upload Error!');

        await this.productImageRepository.update(hasImageSameOrder.id, {
          url: imageUrl,
        });
        hasImageSameOrder.url = imageUrl;
        return { result: hasImageSameOrder };
      }

      const createProductImage = await this.productImageRepository.create({
        order: input.imageOrder,
        productId: input.productId,
        url: '',
      });
      const newProductImage =
        await this.productImageRepository.save(createProductImage);

      const imageUrl = await this.imageCloudGateway.upload(
        input.productId,
        newProductImage.id,
        input.file,
      );
      newProductImage.url = imageUrl;

      const result = await this.productImageRepository.save(newProductImage);
      return { result };
    } catch (error) {
      throw new InternalServerErrorException(`Data Save Error: ${error}`);
    }
  }

}

type Input = {
  productId: string;
  imageOrder: number;
  file: Express.Multer.File;
};

type Output = {
  result: ProductImage;
};
