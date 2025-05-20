import { ProductImage } from "../entities/ProductImage";

export interface ProductImageRepository{
    create(input:any):Promise<ProductImage>;
    findAll(productId:string):Promise<ProductImage[]>;
    findById(productImageId:number):Promise<ProductImage>;
    findByIdAndOrder(productId:string, imageOrder: number):Promise<ProductImage>;
    update(productImageId:number,productImage:Partial<ProductImage>):Promise<void>;
    save(productImage:ProductImage):Promise<ProductImage>;
    delete(productImageId:number):Promise<any>;
}