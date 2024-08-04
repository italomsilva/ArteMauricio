import { Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CategoryRepository } from "src/core/domain/repositories/CategoryRepository";
import { Validator } from "src/core/utils/validators/Validator";

@Injectable()
export class DeleteCategoryUsecase{
    constructor(
        @Inject('categoryRepository') private readonly categoryRepository:CategoryRepository,
    ){}
    async execute(input:Input):Promise<Output>{
        const requiredfields = {fields:{
            id:{require: true}
        }};
        Validator.validateInput(input, requiredfields);      
        const category = await this.categoryRepository.findById(input.id);
        if(!category) throw new NotFoundException('Category Not Found');
        try {
            await this.categoryRepository.delete(input.id);
        } catch (error) {
            throw new InternalServerErrorException(`Data Delete Error: ${error}`)
        }
        return {
            sucess:true
        };
    }
}

type Input = {
    id:number;
}

type Output = {
    sucess:boolean;
}