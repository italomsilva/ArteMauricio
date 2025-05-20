import * as dotenv from 'dotenv';
import { Console } from 'console';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
}
bootstrap();
