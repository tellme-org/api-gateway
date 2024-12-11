import { Controller, Post, Body, Delete, UseGuards, Req, Get } from '@nestjs/common';
import { AuthGatewayService } from './auth-gateway.service'; 
import { AuthGuard } from '@nestjs/passport';
import { DeleteAccounDto } from './dto/deleteAccounDto';
import { ResetPasswordConfirmationDto } from './dto/resetPasswordConfirmationDto';
import { ResetPasswordDemandDto } from './dto/resetPasswordDemandDto';
import { SigninDto } from './dto/signinDto';
import { SignupDto } from './dto/signupDto';

@Controller('auth')
export class AuthGatewayController {
  constructor(private readonly authGatewayService: AuthGatewayService) {}

  @Get("ping")
  ping() {
    return this.authGatewayService.ping();
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) { 
    return this.authGatewayService.signup(signupDto);
  }

  @Post('signin')
  async signin(@Body() signinDto: SigninDto) {
    return this.authGatewayService.signin(signinDto);
  }

  @Post('reset-password')
  async resetPasswordDemand(@Body() resetPasswordDemandDto: ResetPasswordDemandDto) {
    return this.authGatewayService.resetPasswordDemand(resetPasswordDemandDto);
  }

  @Post('reset-password-confirmation')
  async resetPasswordConfirmation(@Body() resetPasswordConfirmationDto: ResetPasswordConfirmationDto) {
    return this.authGatewayService.resetPasswordConfirmation(resetPasswordConfirmationDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete-account')
  async deleteAccount(@Req() request, @Body() deleteAccounDto: DeleteAccounDto) {
    const userId = request.user['userId'];
    return this.authGatewayService.deleteAccount(userId, deleteAccounDto);
  }
}
