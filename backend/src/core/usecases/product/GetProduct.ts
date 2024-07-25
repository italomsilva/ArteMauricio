import { Inject, Injectable } from "@nestjs/common";
import { Product } from "../../domain/entities/Product";
import { ProductRepository } from "../../domain/repositories/ProductRepository";
import { CategoryRepository } from "src/core/domain/repositories/CategoryRepository";
@Injectable()
export class GetProductUseCase{
    constructor(
        @Inject('productRepository') private productRepository:ProductRepository,
        @Inject('categoryRepository') private categoryRepository:CategoryRepository
    ){}

    async execute(id:string):Promise<any>{
        const product= await this.productRepository.findById(id);
        const categories = await this.categoryRepository.findAll();
        return {
            product,
            categories:categories
        }
    }
}