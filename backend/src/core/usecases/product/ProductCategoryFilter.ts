import { Inject, Injectable } from "@nestjs/common";
import { Product } from "src/core/domain/entities/Product";
import { ProductCategoryRepository } from "src/core/domain/repositories/ProductCategoryRepository";
import { ProductRepository } from "src/core/domain/repositories/ProductRepository";

@Injectable()
export class ProductCategoryFilterUseCase{
    constructor(
        @Inject('productRepository')
        private readonly productRepository: ProductRepository,
        @Inject('productCategoryRepository')
        private readonly productCategoryRepository: ProductCategoryRepository,
    ){}

    async execute(input:Input):Promise<Product[]>{
        const productIds = await Promise.all(input.categories.map(async c =>{
            const productCategories = await this.productCategoryRepository.findAllByCategoryName(c);
            const ids = productCategories.map(pc => {
                return pc.productId
            });
            return ids
        }))
        const filteredIds = productIds.reduce((acc, arr) =>{
            return acc.filter(id => arr.includes(id))
        })
        const products = await this.productRepository.findByIds(filteredIds);
        return products;
    }
}

type Input = {
    categories:string[]
}