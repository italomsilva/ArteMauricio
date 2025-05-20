import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductCategory } from "src/core/domain/entities/ProductCategory";
import { ProductCategoryRepository } from "src/core/domain/repositories/ProductCategoryRepository";
import { ProductCategorySchema } from "src/database/schemas/ProductCategorySchema";
import { Repository } from "typeorm";

@Injectable()
export class MySqlProductCategoryRepository implements ProductCategoryRepository{
    constructor(
        @InjectRepository(ProductCategorySchema)
            private productCategoryRepository:Repository<ProductCategory>
    ){}
    async deleteAllByCategoryName(categoryName: string): Promise<any> {
        return await this.productCategoryRepository.delete({categoryName: categoryName})
    }
    async findById(productCategoryId: number): Promise<ProductCategory> {
        return await this.productCategoryRepository.findOne({where:{id: productCategoryId}})
    }
    async create(input: any): Promise<ProductCategory> {
        return await this.productCategoryRepository.create({
            categoryName:input.categoryName, productId:input.productId
        })
    }
    async findAllByProductId(productId: string): Promise<ProductCategory[]> {
        return await this.productCategoryRepository.find({where:{productId: productId}})
    }
    async findAllByCategoryName(categoryName: string): Promise<ProductCategory[]> {
        return await this.productCategoryRepository.find({where:{categoryName}})
    }

    update(productCategory: ProductCategory): Promise<ProductCategory> {
        throw new Error("Method not implemented.");
    }
    async save(productCategory: ProductCategory): Promise<ProductCategory> {
        return await this.productCategoryRepository.save(productCategory);
    }
    async delete(productCategoryId: number): Promise<any> {
        return await this.productCategoryRepository.delete({id: productCategoryId})
    }

}