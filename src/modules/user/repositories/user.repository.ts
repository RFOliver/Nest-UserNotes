import { User } from "../entities/user.entitie";

export abstract class UserRepository {
    abstract create(user: User): Promise<void>;
    abstract findByEmail(email: string): Promise< User | null >
}