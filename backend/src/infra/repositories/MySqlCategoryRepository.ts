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
  create(input: any): Category {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }
  update(category: Category): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  save(category: Category): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  delete(category: Category): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
