import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Product } from 'src/core/domain/entities/Product';
import { ImageCloudGateway } from 'src/core/domain/gateways/ImageCloudGateway';
import { ProductRepository } from 'src/core/domain/repositories/ProductRepository';
import { Validator } from 'src/core/utils/validators/Validator';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('productRepository')
    private readonly productRepository: ProductRepository,
    @Inject('imageCloudGateway')
    private readonly imageCloudGateway: ImageCloudGateway,
  ) {}

  async execute(input: Input): Promise<Output> {
    const requiredfields = {
      fields: {
        title: { require: true },
        price: { require: true },
      },
    };
    Validator.validateInput(input, requiredfields);
    const newProduct = await this.productRepository.create({
      title: input.title,
      price: input.price,
      description: input.description ?? '',
    });
    try {
        const productSaved = await this.productRepository.save(newProduct);
        const url = await this.imageCloudGateway.upload(
          productSaved.id,
          0,
          input.mainPhoto,
          true,
        );
        newProduct.mainPhoto = url;
        const result =await this.productRepository.save(newProduct);
        return { result };
    } catch (error) {
      throw new InternalServerErrorException(`Data Save Error: ${error}`);
    }
  }
}

type Input = {
  title: string;
  price: number;
  description?: string;
  mainPhoto?: Express.Multer.File;
};

type Output = {
  result: Product;
};
