import { Module } from '@nestjs/common';
import { ProductModule } from './modules/ProductModule';
import { DatabaseModule } from './database/DatabaseModule';

@Module({
  imports: [
  DatabaseModule,
  ProductModule,
],
})
export class AppModule {
}
