import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices"; 
import { map } from "rxjs/operators";

@Injectable()
export class AppService {
  constructor(
    @Inject("AUTH_SERVICE") private readonly clientProxyAuthService: ClientProxy
  ) {}

  pingAuthService() { 
    const startTs = Date.now();
    const pattern = { cmd: "ping" };
    const payload = {};
    return this.clientProxyAuthService
      .send<string>(pattern, payload).pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs }))
      );
  }

  getHello(): string {
    return 'Hello World! Api';
  }
}
