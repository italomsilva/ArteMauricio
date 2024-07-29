import { Inject, Injectable } from "@nestjs/common";
import { ProductRepository } from "../../domain/repositories/ProductRepository";
import { Product } from "../../domain/entities/Product";
import { ProductImageRepository } from "src/core/domain/repositories/ProductImageRepository";
import { ProductCategoryRepository } from "src/core/domain/repositories/ProductCategoryRepository";
import { productFormatter } from "src/core/utils/formatters/ProductFormatter";

@Injectable()
export class GetAllProductsUsecase{
    constructor(
        @Inject('productRepository') private readonly productRepository:ProductRepository,
        @Inject('productImageRepository') private readonly productImageRepository:ProductImageRepository,
        @Inject('productCategoryRepository') private readonly productCategoryRepository:ProductCategoryRepository,
    ){}

    async execute():Promise<any>{
        const products = await this.productRepository.findAll();
        const pimages = await this.productImageRepository.findAll(products[0].id);
        const pcategories = await this.productCategoryRepository.findAll(products[0].id);
        return productFormatter({product: products[0], categories: pcategories, images:pimages});
    }
}