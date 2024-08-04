import { Inject, Injectable } from "@nestjs/common";
import { Product } from "src/core/domain/entities/Product";
import { ProductCategoryRepository } from "src/core/domain/repositories/ProductCategoryRepository";
import { ProductRepository } from "src/core/domain/repositories/ProductRepository";
import { Validator } from "src/core/utils/validators/Validator";

@Injectable()
export class ProductCategoryFilterUseCase{
    constructor(
        @Inject('productRepository')
        private readonly productRepository: ProductRepository,
        @Inject('productCategoryRepository')
        private readonly productCategoryRepository: ProductCategoryRepository,
    ){}

    async execute(input:Input):Promise<Output>{
        const requiredfields = {
            fields: {
              categories: { require: true },
            },
          };
        Validator.validateInput(input, requiredfields);
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
        return {
            result: products,
            totalResults: products.length
        };
    }
}

type Input = {
    categories:string[]
}
type Output = {
    result: Product[];
    totalResults: number; 
}