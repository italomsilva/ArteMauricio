import { TypeOrmModule} from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { ProductSchema } from "./schemas/ProductSchema";
import { CategorySchema } from "./schemas/CategorySchema";
import { ProductImageSchema } from "./schemas/ProductImageSchema";
import { ProductCategorySchema } from "./schemas/ProductCategorySchema";
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [ProductSchema, CategorySchema,ProductImageSchema, ProductCategorySchema],
      autoLoadEntities:true,
      synchronize: true,      
    }),
  ],
})
export class DatabaseModule{}