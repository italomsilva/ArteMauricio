import { Injectable, Inject, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { ProductCategoryRepository } from "src/core/domain/repositories/ProductCategoryRepository";

@Injectable()
export class DeleteProductCategoryUsecase{
    constructor(
        @Inject('productCategoryRepository') private readonly productCategoryRepository:ProductCategoryRepository,
    ){}
    async execute(input:Input):Promise<Output>{
        const category = await this.productCategoryRepository.findById(input.productCategoryId);
        if(!category) throw new NotFoundException('Category Not Found');
        try {
            await this.productCategoryRepository.delete(input.productCategoryId);
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
        return {
            sucess:true
        };
    }
}

type Input = {
    productCategoryId:number;
}

type Output = {
    sucess:boolean;
}