import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { DeleteAccounDto } from './dto/deleteAccounDto';
import { ResetPasswordConfirmationDto } from './dto/resetPasswordConfirmationDto';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemandDto';
import { SigninDto } from './dto/signinDto';
import { SignupDto } from './dto/signupDto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGatewayService {
  private clientAuthGatewayProxy: ClientProxy;

  constructor(private readonly configService: ConfigService) {
    this.clientAuthGatewayProxy = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: this.configService.get<string>('HOST'),
        port: this.configService.get<number>('AUTH_SERVICE_PORT'),
      },
    });
    
  console.log(`Gateway:Proxy: clientAuthGatewayProxy is listening on HTTP ${this.configService.get<string>('HOST')}:${this.configService.get<number>('AUTH_SERVICE_PORT')}`);
  }
 
  async ping() {
    return this.clientAuthGatewayProxy.send('ping', "");
  }
  async signup(signupDto: SignupDto) { 
    return this.clientAuthGatewayProxy.send('signup', signupDto);
  }

  async signin(signinDto: SigninDto) {
    return this.clientAuthGatewayProxy.send('signin', signinDto);
  }

  async resetPasswordDemand(dto: ResetPasswordDemandDto) {
    return this.clientAuthGatewayProxy.send('reset-password-demand', dto);
  }

  async resetPasswordConfirmation(dto: ResetPasswordConfirmationDto) {
    return this.clientAuthGatewayProxy.send('reset-password-confirmation', dto);
  }

  async deleteAccount(userId: string, dto: DeleteAccounDto) {
    return this.clientAuthGatewayProxy.send('delete-account', { userId, deleteAccounDto: dto });
  }
  
  async validateUser(email: string) { 
    return this.clientAuthGatewayProxy.send('validate-user', {email: email});
  }

}
