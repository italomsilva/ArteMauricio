import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ProductCategory } from "src/core/domain/entities/ProductCategory";
import { CategoryRepository } from "src/core/domain/repositories/CategoryRepository";
import { ProductCategoryRepository } from "src/core/domain/repositories/ProductCategoryRepository";
import { Validator } from "src/core/utils/validators/Validator";

@Injectable()
export class AddProductCategoryUseCase{
    constructor(
        @Inject('productCategoryRepository')
        private readonly productCategoryRepository:ProductCategoryRepository,
        @Inject('categoryRepository')
        private readonly categoryRepository:CategoryRepository

    ){}

    async execute(input:Input):Promise<Output>{
        const requiredfields = {fields:{
                productId:{require: true},
                categoryName:{require: true}
        }};
        Validator.validateInput(input, requiredfields);
        const category = await this.categoryRepository.findByName(input.categoryName);
        if(!category) throw new NotFoundException('Category Not Found');
        const productCategories = await this.productCategoryRepository.findAllByProductId(input.productId);
        const hasSameName = productCategories.some(productCategory => productCategory.categoryName == input.categoryName);
        if(hasSameName){
            throw new ConflictException('The product already has this category');
        }
        if(productCategories.length>5){
            throw new InternalServerErrorException('Too many categories for one product! Limit: 5')
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
            throw new InternalServerErrorException(`Data Save Error: ${error}`)
        }
        return {result: newProductCategory};
    }
}

type Input = {
    productId:string;
    categoryName:string;
}
type Output = {
    result: ProductCategory;
}
