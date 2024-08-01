import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Category } from "src/core/domain/entities/Category";
import { CategoryRepository } from "src/core/domain/repositories/CategoryRepository";

@Injectable()
export class EditCategoryUsecase{
    constructor(
        @Inject('categoryRepository') private readonly categoryRepository:CategoryRepository
    ){}
    async execute(input:Input):Promise<Category>{
        const category = await this.categoryRepository.findById(input.id);
        if(!category) throw new NotFoundException('Category Not Found');
        if(input.productCount){
            category.productCount=input.productCount;
        }
        if(input.newName){
            category.name=input.newName;
        }

        try {
            await this.categoryRepository.update(category);
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
        return category;
    }
}

type Input = {
    id:number;
    newName?:string;
    productCount?:number;
}