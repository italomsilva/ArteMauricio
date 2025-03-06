import { Injectable } from '@nestjs/common';
import { Product } from 'src/core/domain/entities/Product';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSchema } from 'src/database/schemas/ProductSchema';
import { ProductRepository } from 'src/core/domain/repositories/ProductRepository';

@Injectable()
export class MySqlProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductSchema)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(productData: any): Promise<Product> {
    return await this.productRepository.create({
      title: productData.title,
      description: productData.description,
      price: productData.price,
      mainPhoto: productData.mainPhoto,
    });
  }
  async findByIds(ids: string[]): Promise<Product[]> {
    const result = await Promise.all(
      ids.map(async (id) => {
        return await this.productRepository.findOne({ where: { id } });
      }),
    );
    return result;
  }
  async findAll(
    page: number = 1,
    limit: number = 15,
    searchQuery?: string,
  ): Promise<Product[]> {
    const query = this.productRepository.createQueryBuilder('product')
      .orderBy('product.updatedAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);
  
    if (searchQuery) {
      query.where('product.title LIKE :searchQuery OR product.description LIKE :searchQuery', {
        searchQuery: `%${searchQuery}%`,
      });
    }
  
    return await query.getMany();
  }
    findByCategories(category: string[]): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
  async save(product: Product): Promise<Product> {
    const result = await this.productRepository.save(product);
    return result;
  }
  async update(productId: string, productData: Partial<Product>): Promise<any> {
    return await this.productRepository.update({ id: productId }, productData);
  }
  async delete(productId: string): Promise<any> {
    await this.productRepository.delete({ id: productId });
  }
  async findById(id: string): Promise<Product> {
    const result = await this.productRepository.findOne({ where: { id: id } });
    return result;
  }
}
