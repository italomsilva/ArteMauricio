import { ProductImage } from "../entities/ProductImage";

export interface ProductImageRepository{
    create(input:any):ProductImage;
    findAll(productId:string):Promise<ProductImage[]>;
    update(productImage:ProductImage):Promise<ProductImage>;
    save(productImage:ProductImage):Promise<ProductImage>;
    delete(productImage:ProductImage):Promise<any>;
}