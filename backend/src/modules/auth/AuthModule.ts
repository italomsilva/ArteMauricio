import { Module } from "@nestjs/common";
import { LoginUseCase } from "src/core/usecases/auth/Login";
import { JwtAuthTokenGateway } from "src/infra/gateway/JwtAuthTokenGateway";
import { AuthController } from "./controllers/AuthController";

@Module({
    providers:[
        {
            provide: 'authTokenGateway',
            useClass: JwtAuthTokenGateway
        },
        LoginUseCase
    ],
    controllers:[AuthController]
})
export class AuthModule{}