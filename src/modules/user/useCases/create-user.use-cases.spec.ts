import { UserWithSameEmailException } from "../exceptions/user-with-same-email.exception"
import { makeUser } from "../factories/user.factory"
import { UserRepositoryInMemory } from "../repositories/user.repository.memory"
import { CreateUserUseCase } from "./create-user.use-cases"
import { compare } from 'bcrypt'

let createUserUseCase: CreateUserUseCase
let userRepositoryInMemory: UserRepositoryInMemory

describe('Create User', () => {

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    })

    it("Should be able to create user", async () => {
        expect(userRepositoryInMemory.users).toEqual([])

        const user = await createUserUseCase.execute({
            email: 'email@teste.com.br',
            name: 'teste',
            password: '123123'
        })

        expect(userRepositoryInMemory.users).toEqual([user])

    })

    it("Should be able to create user with password encrypted", async () => {
        const userPasswordWithoutEncryption = '123123'

        const user = await createUserUseCase.execute({
            email: 'email@teste.com.br',
            name: 'teste',
            password: userPasswordWithoutEncryption
        })

        const userHasPasswordEncrypted = await compare(userPasswordWithoutEncryption,user.password)

        expect(userHasPasswordEncrypted).toBeTruthy()
    })

    it("Should be able to throw error when create user with already exist email", () => {

        const user = makeUser({})

        userRepositoryInMemory.users = [user]

        expect(async () => await createUserUseCase.execute({
            email: user.email,
            name: 'teste',
            password: '123123'
        })).rejects.toThrow(UserWithSameEmailException)

    })
})