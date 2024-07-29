import { ProductCategory } from "../entities/ProductCategory";

export interface ProductCategoryRepository{
    create(input:any):ProductCategory;
    findAll(productId:string):Promise<ProductCategory[]>;
    update(productCategory:ProductCategory):Promise<ProductCategory>;
    save(productCategory:ProductCategory):Promise<ProductCategory>;
    delete(productCategory:ProductCategory):Promise<any>;
}