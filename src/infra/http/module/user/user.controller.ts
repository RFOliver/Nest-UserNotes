import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "src/modules/user/useCases/create-user.use-cases";
import { CreateUserBody } from "./dtos/create-user-body";
import { UserViewModel } from "./viewModule/user.view-model";

@Controller('users')
export class UserController {

    constructor(private createUserUseCase: CreateUserUseCase){}

    @Post()
    async createPost(@Body() body: CreateUserBody){
        const { email, name, password } = body

        const user = await this.createUserUseCase.execute({ email, name, password })

        return UserViewModel.toHttp(user);
    }

}