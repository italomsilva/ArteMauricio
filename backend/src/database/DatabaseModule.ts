import { TypeOrmModule} from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { ProductSchema } from "./schemas/ProductSchema";
import { CategorySchema } from "./schemas/CategorySchema";
import { ProductImageSchema } from "./schemas/ProductImageSchema";
import { ProductCategorySchema } from "./schemas/ProductCategorySchema";
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      entities: [ProductSchema, CategorySchema,ProductImageSchema, ProductCategorySchema],
      autoLoadEntities:true,
    }),
  ],
})
export class DatabaseModule{}