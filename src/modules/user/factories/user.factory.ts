import { User } from "../entities/user.entitie"

type Override = Partial<User>

export const makeUser = ({ id, ...override}: Override) => {
    return new User({
        email: 'email@testes.com',
        name: 'Tester',
        password: '123123',
        ...override,
    },
    id,
);

}