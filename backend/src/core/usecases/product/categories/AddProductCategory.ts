import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ProductCategory } from "src/core/domain/entities/ProductCategory";
import { CategoryRepository } from "src/core/domain/repositories/CategoryRepository";
import { ProductCategoryRepository } from "src/core/domain/repositories/ProductCategoryRepository";

@Injectable()
export class AddProductCategoryUseCase{
    constructor(
        @Inject('productCategoryRepository')
        private readonly productCategoryRepository:ProductCategoryRepository,
        @Inject('categoryRepository')
        private readonly categoryRepository:CategoryRepository

    ){}

    async execute(input:Input):Promise<ProductCategory>{
        const category = await this.categoryRepository.findByName(input.categoryName);
        if(!category) throw new NotFoundException('Category Not Found');
        const productCategories = await this.productCategoryRepository.findAllByProductId(input.productId);
        const hasSameName = productCategories.some(productCategory => productCategory.categoryName == input.categoryName);
        if(hasSameName){
            throw new ConflictException('The product already has this category');
        }
        if(productCategories.length>4){
            throw new InternalServerErrorException('Too many images for one product! Limit: 5')
        }
        const newProductCategory = await this.productCategoryRepository.create({
            productId: input.productId,
            categoryName: input.categoryName
        })
        try {
            await this.productCategoryRepository.save(newProductCategory);
            category.productCount = (category.productCount)+1;
            await this.categoryRepository.save(category);
        } catch (error) {
            throw new InternalServerErrorException('Error saving')
        }
        return newProductCategory;
    }
}

type Input = {
    productId:string;
    categoryName:string;
}