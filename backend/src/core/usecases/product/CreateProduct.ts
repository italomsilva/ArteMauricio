import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Product } from "src/core/domain/entities/Product";
import { ProductCategoryRepository } from "src/core/domain/repositories/ProductCategoryRepository";
import { ProductRepository } from "src/core/domain/repositories/ProductRepository";

@Injectable()
export class CreateProductUseCase{
    constructor(
        @Inject('productRepository') private readonly productRepository:ProductRepository
    ){}

    async execute(input:Input):Promise<Product>{
        const newProduct = await this.productRepository.create({
            title:input.title,
            price:input.price,
            description:input.description,
            mainPhoto:input.mainPhoto
        })
        try {
            await this.productRepository.save(newProduct);
        } catch (error) {
            throw new InternalServerErrorException('Error saving')
        }
        return newProduct;
    }
}

type Input = {
    title:string;
    price:number;
    description:string;
    mainPhoto:string;
}