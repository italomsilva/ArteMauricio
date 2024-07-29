import { ProductImage } from "src/core/domain/entities/ProductImage";
import { EntitySchema } from "typeorm";

export const ProductImageSchema = new EntitySchema<ProductImage>({
    name: 'ProductImage',
    target: ProductImage,
    tableName:'product_images',
    columns:{
        id:{
            type:'int',
            generated: 'increment',
            primary: true
        },
        productId:{
            name:'product_id',
            type: 'varchar',
            length: 36,
            nullable:false
        },
        url:{
            type: 'varchar',
            length:255,
            nullable:false
        },
        order:{
            type: 'int',
            nullable:false
        }
    }
})