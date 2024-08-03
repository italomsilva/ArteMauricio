import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ProductRepository } from "src/core/domain/repositories/ProductRepository";

@Injectable()
export class EditProductUseCase{
    constructor(
        @Inject('productRepository') private readonly productRepository:ProductRepository,
    ){}

    async execute(input:Input):Promise<any>{
        const product = await this.productRepository.findById(input.productId);
        if(!product) throw new NotFoundException('Product Not found');
        if(input.title && input.title != undefined && input.title != null){
            product.title=input.title;
        }
        if(input.price && input.price != undefined && input.price != null){
            product.price=input.price;
        }
        if(input.description && input.description != undefined && input.description != null){
            product.description=input.description;
        }
        if(input.mainPhoto && input.mainPhoto != undefined && input.mainPhoto != null){
            product.mainPhoto=input.mainPhoto;
        }
        try {
            await this.productRepository.update(input.productId,{
                title: product.title,
                price: product.price,
                description: product.description,
                mainPhoto: product.mainPhoto
            });
        } catch (error) {
            throw new InternalServerErrorException('Error editing')
        }
        return product;
    }
}

type Input = {
    productId:string;
    title?:string;
    price?:number;
    description?:string;
    mainPhoto?:string

}