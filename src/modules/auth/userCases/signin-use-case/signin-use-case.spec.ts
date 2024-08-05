import { JwtService } from "@nestjs/jwt"
import { SignInUseCase } from "./signin.use-case"
import { makeUser } from "src/modules/user/factories/user.factory"
import { UserPayload } from "../../Models/user-payload"

let signInUseCase: SignInUseCase
let jwtService: JwtService

describe('Sign in with JWT', () => {
    beforeEach(()=>{

        jwtService = new JwtService({ secret: 'secret'})
        signInUseCase = new SignInUseCase(jwtService)

    })

    it('Should be able to create valid access_token', async () => {
        const user = makeUser({});

        const token = await signInUseCase.execute({
            user,
        });

        const payload = jwtService.decode(token) as UserPayload

        expect(payload.sub).toEqual(user.id)
    })
})