import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/core/domain/entities/Category";
import { CategoryRepository } from "src/core/domain/repositories/CategoryRepository";
import { CategorySchema } from "src/database/schemas/CategorySchema";
import { Repository } from "typeorm";

@Injectable()
export class MySqlCategoryRepository implements CategoryRepository {
  constructor(
    @InjectRepository(CategorySchema)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(categoryName:string): Promise<Category> {
    return await this.categoryRepository.create({ name: categoryName });
  }
  async findById(categoryId: number): Promise<Category> {
    return await this.categoryRepository.findOneBy({id:categoryId});
  }
  async findByName(categoryName: string): Promise<Category> {
    return await this.categoryRepository.findOneBy({name:categoryName});
  }
  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }
  async update(category: Category): Promise<any> {
    return await this.categoryRepository.update({id:category.id}, category)
  }
  async save(category: Category): Promise<Category> {
    return await this.categoryRepository.save(category);
  }
  async delete(categoryId: number): Promise<any> {
    return await this.categoryRepository.delete({id: categoryId});
  }
}
