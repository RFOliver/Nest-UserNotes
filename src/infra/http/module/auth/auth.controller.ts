import { Controller, HttpCode, HttpStatus, Post, UseGuards, Request, Get } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthRequestModel } from "./models/auth-request.model";
import { SignInUseCase } from "src/modules/auth/userCases/signin-use-case/signin.use-case";
import { LocalAuthGuard } from "./guards/loca-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { Public } from "./decorators/isPublic";
import { AuthenticatedRequestModel } from "./models/authenticated-request.model";

@Controller()
export class AuthController {

    constructor(private signInUseCase: SignInUseCase){}

    @Post('signIn')
    @Public()
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    async signIn(@Request() request: AuthRequestModel){
        const access_token = await this.signInUseCase.execute({user: request.user});

        return { access_token }
    }

    @Get('test')
    @UseGuards(JwtAuthGuard)
    async test(@Request() request: AuthenticatedRequestModel){
        return request.user;
    }
}