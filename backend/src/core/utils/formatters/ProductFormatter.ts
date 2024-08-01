import { Product } from "src/core/domain/entities/Product";
import { ProductCategory } from "src/core/domain/entities/ProductCategory";
import { ProductImage } from "src/core/domain/entities/ProductImage";

export function productFormatter(input: {product:Product, categories:ProductCategory[], images:ProductImage[]}):any{
    return {
        id: input.product.id,
        title: input.product.title,
        price: input.product.price,
        mainPhoto: input.product.mainPhoto,
        categories: input.categories.map(c=>{
            return c.categoryName
        }),
        images: input.images.map(i => {
            return {
                url: i.url,
                order: i.order
            }
        })
    }
}