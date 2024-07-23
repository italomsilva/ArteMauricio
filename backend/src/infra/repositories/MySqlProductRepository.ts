import { Injectable } from "@nestjs/common";
import { Product } from "src/core/domain/entities/Product";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductSchema } from "src/database/schemas/ProductSchema";
import { ProductRepository } from "src/core/domain/repositories/ProductRepository";

@Injectable()
export class MySqlProductRepository implements ProductRepository{
constructor(
    @InjectRepository(ProductSchema)
    private readonly productRepository:Repository<Product>,
){}
    async findAll(): Promise<Product[]> {
        const result = await this.productRepository.find();
        return result;
    }
    findByCategories(category: string[]): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    save(product: Product): boolean {
        throw new Error("Method not implemented.");
    }
    edit(product: Product): boolean {
        throw new Error("Method not implemented.");
    }
    delete(product: Product): boolean {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<Product> {
        const result = await this.productRepository.findOne({where:{id:id}})
        return result;
    }
    
}