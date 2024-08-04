import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Product } from "src/core/domain/entities/Product";
import { ProductRepository } from "src/core/domain/repositories/ProductRepository";
import { Validator } from "src/core/utils/validators/Validator";

@Injectable()
export class CreateProductUseCase{
    constructor(
        @Inject('productRepository') private readonly productRepository:ProductRepository
    ){}

    async execute(input:Input):Promise<Output>{
        const requiredfields = {
            fields: {
              title: { require: true },
              price: { require: true }
            },
          };
          Validator.validateInput(input, requiredfields);      
        const newProduct = await this.productRepository.create({
            title:input.title,
            price:input.price,
            description:input.description,
            mainPhoto:input.mainPhoto
        })
        try {
            await this.productRepository.save(newProduct);
        } catch (error) {
            throw new InternalServerErrorException(`Data Save Error: ${error}`)
        }
        return {result:newProduct};
    }
}

type Input = {
    title:string;
    price:number;
    description?:string;
    mainPhoto?:string;
}

type Output = {
    result: Product
  }