import { Module } from '@nestjs/common';
import { AuthGatewayService } from './auth-gateway.service';
import { AuthGatewayController } from './auth-gateway.controller';
import { JwtStrategy } from './strategy.service';

@Module({ 
    controllers: [AuthGatewayController],
    providers: [AuthGatewayService, JwtStrategy]})
export class AuthGatewayModule {}
