import { Category } from "src/core/domain/entities/Category";
import { EntitySchema } from "typeorm";

export const CategorySchema = new EntitySchema<Category>({
    name:'Category',
    target: Category,
    tableName: 'categories',
    columns: {
        id:{
            type: 'int',
            primary: true,
            generated: 'increment'
        },
        name:{
            type: 'varchar',
            length: 36,
            nullable: false,
        },
        productCount:{
            name: 'product_count',
            type: 'int',
            default: 0
        }
    }
});