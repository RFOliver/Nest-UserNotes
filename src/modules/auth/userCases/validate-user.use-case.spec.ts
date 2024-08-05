import { User } from "src/modules/user/entities/user.entitie"
import { ValidateUserUseCase } from "./validate-user.use-case"
import { UserRepositoryInMemory } from "src/modules/user/repositories/user.repository.memory"
import { hash } from "bcrypt"
import { makeUser } from "src/modules/user/factories/user.factory"
import exp from "constants"
import { UnauthorizedException } from "@nestjs/common"
import { AuthValueIncorrectException } from "../exceptions/auth-values-incorrect.exception"

let validateUserUseCase: ValidateUserUseCase
let userRepositoryInMemory: UserRepositoryInMemory

describe("Validate user", () => {

    beforeEach(()=>{
        userRepositoryInMemory = new UserRepositoryInMemory()
        validateUserUseCase = new ValidateUserUseCase(userRepositoryInMemory)
    })

    it("Should be able to return user when credential are correct", async () => {
        const userPasswordWithoutEncryption = '123123'

        const user = makeUser({
            password: await hash(userPasswordWithoutEncryption,10)
        })

        userRepositoryInMemory.users = [user];

        const result = await validateUserUseCase.execute({
            email: user.email,
            password: userPasswordWithoutEncryption,
        })

        expect(result).toEqual(user)
    })


    it("Should be able to throw error whrn credentials incorrect", async () => {
        const userPasswordWithoutEncryption = '123123'

        const user = makeUser({
            password: await hash(userPasswordWithoutEncryption,10)
        })

        userRepositoryInMemory.users = [user];

        expect( async () => {
            await validateUserUseCase.execute({
                email: 'incorrect@teste.com',
                password: userPasswordWithoutEncryption,
            })
        }).rejects.toThrow(AuthValueIncorrectException)

        expect( async () => {
            await validateUserUseCase.execute({
                email: user.email,
                password: 'incorrect password',
            })
        }).rejects.toThrow(AuthValueIncorrectException)

    })
})