import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule); 
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.API_GATEWAY_PORT);
  console.log(`Api gateway is listening on HTTP ${process.env.HOST}:${parseInt(process.env.API_GATEWAY_PORT)}`);
}
bootstrap();
