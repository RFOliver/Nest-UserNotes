import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "src/modules/user/repositories/user.repository";
import { compare } from 'bcrypt'
import { AuthValueIncorrectException } from "../exceptions/auth-values-incorrect.exception";

interface ValidateUserRequest{
    email: string
    password: string
}

@Injectable()
export class ValidateUserUseCase{

    constructor(private useRepository: UserRepository){}

    async execute({email, password} : ValidateUserRequest){

        const user = await this.useRepository.findByEmail(email)

        if (!user)
            throw new AuthValueIncorrectException()

        const isPasswordMatched = compare(password, user.password)

        if (!isPasswordMatched)
            throw new AuthValueIncorrectException()

        return user;
    }
}