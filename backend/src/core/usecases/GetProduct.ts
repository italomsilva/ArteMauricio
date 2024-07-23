import { Inject, Injectable } from "@nestjs/common";
import { Product } from "../domain/entities/Product";
import { ProductRepository } from "../domain/repositories/ProductRepository";
@Injectable()
export class GetProductUseCase{
    constructor(
        @Inject('productRepository') private productRepository:ProductRepository
    ){}

    async execute(id:string):Promise<Product>{
        return await this.productRepository.findById(id);
    }
}