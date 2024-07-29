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
    create(input: any): ProductCategory {
        throw new Error("Method not implemented.");
    }
    async findAll(productId: string): Promise<ProductCategory[]> {
        return await this.productCategoryRepository.find({where:{productId: productId}})
    }
    update(productCategory: ProductCategory): Promise<ProductCategory> {
        throw new Error("Method not implemented.");
    }
    save(productCategory: ProductCategory): Promise<ProductCategory> {
        throw new Error("Method not implemented.");
    }
    delete(productCategory: ProductCategory): Promise<any> {
        throw new Error("Method not implemented.");
    }

}