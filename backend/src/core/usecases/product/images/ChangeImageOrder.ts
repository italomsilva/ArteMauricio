import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ProductImageRepository } from "src/core/domain/repositories/ProductImageRepository";

@Injectable()
export class ChangeImageOrderUseCase {
  constructor(
    @Inject('productImageRepository')
    private readonly productImageRepository: ProductImageRepository,
  ) {}

  async execute(input:Input):Promise<Output>{
    const productImages = await this.productImageRepository.findAll(input.productId);
    const productImage = productImages.find(productImage => productImage.id==input.imageId);
    if(!productImage) throw new NotFoundException('Image Not Found');
    const hasSameOrder = productImages.some(productImage => productImage.order==input.order);
    if(hasSameOrder) throw new ConflictException('An image with this order already exists');
    try {
        await this.productImageRepository.update(input.imageId,{order:input.order})
        return{sucess: true}
    } catch (error) {
        throw new InternalServerErrorException(`Data Edit Error: ${error}`)
    }
  }
}

type Input = {
    productId:string;
    imageId:number;
    order:number;
}

type Output = {
  sucess: boolean
}