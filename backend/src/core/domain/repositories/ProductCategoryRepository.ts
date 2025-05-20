import { ProductCategory } from "../entities/ProductCategory";

export interface ProductCategoryRepository{
    create(input:any):Promise<ProductCategory>;
    findById(productCategoryId:number):Promise<ProductCategory>;
    findAllByProductId(productId:string):Promise<ProductCategory[]>;
    findAllByCategoryName(categoryName:string):Promise<ProductCategory[]>;
    update(productCategory:ProductCategory):Promise<ProductCategory>;
    save(productCategory:ProductCategory):Promise<any>;
    delete(productCategoryId:number):Promise<any>;
    deleteAllByCategoryName(categoryName:string):Promise<any>;
}