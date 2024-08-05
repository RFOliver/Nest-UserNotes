import { User } from "src/modules/user/entities/user.entitie";

export class UserViewModel{
    static toHttp({createdAt,email, name, id}: User){
        return {
            id,
            name,
            email,
            createdAt
        }
    }
}