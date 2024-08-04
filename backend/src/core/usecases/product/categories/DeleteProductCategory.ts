import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProductCategoryRepository } from 'src/core/domain/repositories/ProductCategoryRepository';
import { Validator } from 'src/core/utils/validators/Validator';

@Injectable()
export class DeleteProductCategoryUsecase {
  constructor(
    @Inject('productCategoryRepository')
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}
  async execute(input: Input): Promise<Output> {
    const requiredfields = {
      fields: {
        productCategoryId: { require: true },
      },
    };
    Validator.validateInput(input, requiredfields);
    const category = await this.productCategoryRepository.findById(
      input.productCategoryId,
    );
    if (!category) throw new NotFoundException('Category Not Found');
    try {
      await this.productCategoryRepository.delete(input.productCategoryId);
    } catch (error) {
      throw new InternalServerErrorException(`Data Delete Error: ${error}`);
    }
    return {
      sucess: true,
    };
  }
}

type Input = {
  productCategoryId: number;
};

type Output = {
  sucess: boolean;
};
