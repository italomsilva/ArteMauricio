import { Product } from "src/core/domain/entities/Product";
export interface ProductRepository{
    findById(id:string):Promise<Product>;
    findByIds(ids:string[]):Promise<Product[]>;
    findAll():Promise<Product[]>;
    findByCategories(category:string[]):Promise<Product[]>;
    save(product:Product):Promise<Product>;
    edit(product:Product):boolean;
    delete(product:Product):boolean;
}