import { Body, Controller, Post } from "@nestjs/common";
import { LoginUseCase } from "src/core/usecases/auth/Login";

@Controller()
export class AuthController{
    constructor(
        private readonly loginUseCase:LoginUseCase
    ){}
    @Post('login')
    async login(@Body() body):Promise<any>{
        const result = await this.loginUseCase.execute(body);
        return { result: result}
    }
}