import { Inject, Injectable } from "@nestjs/common";
import { Category } from "src/core/domain/entities/Category";
import { CategoryRepository } from "src/core/domain/repositories/CategoryRepository";

@Injectable()
export class GetAllCategoriesUseCase{
    constructor(
        @Inject('categoryRepository') private readonly categoryRepository:CategoryRepository
    ){}
    async execute():Promise<Output>{
        const result = await this.categoryRepository.findAll();
        return {
            result: result,
            totalResults: result.length
        };
    }
}

type Output = {
    result: Category[];
    totalResults: number; 
}