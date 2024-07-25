import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Product } from "src/core/domain/entities/Product";
import { Category } from "src/core/domain/entities/Category";
import { ProductSchema } from "./schemas/ProductSchema";
import { CategorySchema } from "./schemas/CategorySchema";
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [ProductSchema, CategorySchema],
      autoLoadEntities:true,
      synchronize: true,      
    }),
  ],
})
export class DatabaseModule{}