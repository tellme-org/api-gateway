import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt"; 
import { AuthGatewayService } from "./auth-gateway.service";
import { firstValueFrom } from 'rxjs';

type Payload = {
    sub :  number, 
    email : string, 
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        configService : ConfigService, 
        private readonly authGatewayService: AuthGatewayService, 
    ) {
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : configService.get("SECRET_KEY"),
            ignoreExpiration : false,
        })
    }

    async validate(payload : Payload) { 
        // later, move into user webservice /user 
        const user = await firstValueFrom(
            await this.authGatewayService.validateUser(payload.email)
        ); 
        if (!user) throw new UnauthorizedException("Unauthorized");
        // Remove password property
        Reflect.deleteProperty(user, "password") 
        return user
    }  
}