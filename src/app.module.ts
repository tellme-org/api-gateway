import { Module } from '@nestjs/common';
import { AppController } from './app.controller'; 
import * as dotenv from 'dotenv';
import { AuthGatewayModule } from './auth-gateway/auth-gateway.module';
import { ConfigModule } from '@nestjs/config';

dotenv.config(); 
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal : true}), 
    AuthGatewayModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
