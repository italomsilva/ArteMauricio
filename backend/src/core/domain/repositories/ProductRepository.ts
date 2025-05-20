import { Product } from 'src/core/domain/entities/Product';
export interface ProductRepository {
  create(productData: any): Promise<Product>;
  findById(id: string): Promise<Product>;
  findByIds(ids: string[]): Promise<Product[]>;
  findAll(
    page: number,
    limit: number,
    searchQuery?: string,
    category?: string,
  ): Promise<Product[]>;
  findByCategories(category: string[]): Promise<Product[]>;
  save(product: Product): Promise<Product>;
  update(productId: string, productData: Partial<Product>): Promise<any>;
  delete(productId: string): Promise<any>;
}
