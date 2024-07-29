import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductImage } from "src/core/domain/entities/ProductImage";
import { ProductImageRepository } from "src/core/domain/repositories/ProductImageRepository";
import { ProductImageSchema } from "src/database/schemas/ProductImageSchema";
import { Repository } from "typeorm";

@Injectable()
export class MySqlProductImagesRepository implements ProductImageRepository{
    constructor(
        @InjectRepository(ProductImageSchema) private productImagesRepository:Repository<ProductImage>
    ){}
    create(input: any): ProductImage {
        throw new Error("Method not implemented.");
    }
    async findAll(productId:string): Promise<ProductImage[]> {
        return await this.productImagesRepository.find({where:{productId: productId}})
    }
    update(productImage: ProductImage): Promise<ProductImage> {
        throw new Error("Method not implemented.");
    }
    save(productImage: ProductImage): Promise<ProductImage> {
        throw new Error("Method not implemented.");
    }
    delete(productImage: ProductImage): Promise<any> {
        throw new Error("Method not implemented.");
    }
}