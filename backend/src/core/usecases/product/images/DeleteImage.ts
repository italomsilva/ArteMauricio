import { Injectable, Inject, NotFoundException, InternalServerErrorException, BadRequestException } from "@nestjs/common";
import { ProductImageRepository } from "src/core/domain/repositories/ProductImageRepository";

@Injectable()
export class DeleteImageUseCase {
  constructor(
    @Inject('productImageRepository')
    private readonly productImageRepository: ProductImageRepository,
  ) {}

  async execute(input:Input):Promise<Output>{
    const productImage = await this.productImageRepository.findById(input.imageId);
    if(!productImage) throw new NotFoundException('Image Not Found');
    if(productImage.productId != input.productId) throw new BadRequestException('Invalid ProductId or ImageId');
    try {
        await this.productImageRepository.delete(productImage.id);
        return {sucess: true};
    } catch (error) {
        throw new InternalServerErrorException(`Data Delete Error: ${error}`);
    }
  }
}

type Input = {
    productId:string;
    imageId:number;
}
type Output = {
  sucess: boolean
}