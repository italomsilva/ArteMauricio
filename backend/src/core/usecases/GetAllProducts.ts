import { Inject, Injectable } from "@nestjs/common";
import { ProductRepository } from "../domain/repositories/ProductRepository";
import { Product } from "../domain/entities/Product";

@Injectable()
export class GetAllProductsUsecase{
    constructor(
        @Inject('productRepository') private readonly productRepository:ProductRepository
    ){}

    async execute():Promise<Product[]>{
        return await this.productRepository.findAll();
    }
}