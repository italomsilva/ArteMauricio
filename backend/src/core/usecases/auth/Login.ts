import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthTokenGateway, Payload } from "src/core/domain/gateways/AuthTokenGateway";

@Injectable()
export class LoginUseCase{
    constructor(
        @Inject('authTokenGateway') private readonly authTokenGateway:AuthTokenGateway
    ){}

    async execute(input:Payload):Promise<string>{
        if(input.login != process.env.ADMIN_LOGIN || input.password != process.env.ADMIN_PASSWORD){
            throw new UnauthorizedException('INVALID LOGIN OR PASSWORD');
        }
        return await this.authTokenGateway.signIn(input);
    }
}

