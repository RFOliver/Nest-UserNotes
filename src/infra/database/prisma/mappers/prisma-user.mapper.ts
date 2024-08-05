import { User } from "src/modules/user/entities/user.entitie";
import { User as UserRaw } from "@prisma/client";

export class PrismaUserMapper{

    static toPrisma({ createdAt, email, password, id , name }: User): UserRaw {
        return {
            createdAt, email, password, id , name
        }
    }


    static toDomain({id, createdAt, email, password, name }: UserRaw): User {
        return new User({
            createdAt, email, password, name,
        }, id)
    }
}