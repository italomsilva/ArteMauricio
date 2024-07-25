import { Module } from '@nestjs/common';
import { ProductModule } from './modules/ProductModule';
import { DatabaseModule } from './database/DatabaseModule';
import { MiddlewareModule } from './modules/middleware/MiddlewareModule';
import { AuthModule } from './modules/auth/AuthModule';

@Module({
  imports: [
  DatabaseModule,
  MiddlewareModule,
  AuthModule,
  ProductModule,
],
})
export class AppModule {
}
