import { Controller, Get, Param } from "@nestjs/common";
import { GetAllProductsUsecase } from "src/core/usecases/GetAllProducts";
import { GetProductUseCase } from "src/core/usecases/GetProduct";

@Controller('products')
export class ProductController{
    constructor(
        private readonly getProductUseCase:GetProductUseCase,
        private readonly getAllProductsUseCase:GetAllProductsUsecase
    ){}
    @Get(':id')
    async getProduct(@Param() params):Promise<any>{
        return await this.getProductUseCase.execute(params.id)
    }
    @Get()
    async getAllProducts():Promise<any>{
        return await this.getAllProductsUseCase.execute();
    }

}