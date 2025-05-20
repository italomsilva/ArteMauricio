import { ProductCategory } from "src/core/domain/entities/ProductCategory";
import { EntitySchema } from "typeorm";

export const ProductCategorySchema = new EntitySchema<ProductCategory>({
    name:'ProductCategory',
    target:ProductCategory,
    tableName: 'product_categories',
    columns:{
        id:{
            type:'int',
            generated: 'increment',
            primary: true
        },
        productId:{
            name: 'product_id',
            type: 'varchar',
            length: 36,
            nullable: false
        },
        categoryName:{
            name: 'category_name',
            type: 'varchar',
            length: 36,
            nullable: false
        }
    }
})