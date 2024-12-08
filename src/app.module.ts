import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from "@nestjs/microservices";
import * as dotenv from 'dotenv';

dotenv.config(); 
@Module({
  imports: [
    // TCP Proxy for Auth Service
    ClientsModule.register([
      {
        name: "AUTH_SERVICE",
        transport: Transport.TCP,
        options: {
          host: process.env.HOST,
          port: parseInt(process.env.AUTHSERVICEPORT, 10),
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
