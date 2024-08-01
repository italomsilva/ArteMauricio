import { Category } from "src/core/domain/entities/Category";
import { Product } from "src/core/domain/entities/Product";
import { ProductImage } from "src/core/domain/entities/ProductImage";

export function productFormatter(input: {product:Product, categories:Category[], images:ProductImage[]}):any{
    return {
        id: input.product.id,
        title: input.product.title,
        price: input.product.price,
        mainPhoto: input.product.mainPhoto,
        categories: input.categories.map(c=>{
            return c
        }),
        images: input.images.map(i => {
            return i
        })
    }
}