import { User } from "src/modules/user/entities/user.entitie";
import { UserRepository } from "src/modules/user/repositories/user.repository";
import { PrismaService } from "../prisma.service";
import { PrismaUserMapper } from "../mappers/prisma-user.mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUserRepository implements UserRepository {

    constructor(private prisma: PrismaService){}

    async create(user: User): Promise<void> {

        const userRaw = PrismaUserMapper.toPrisma(user);

        await this.prisma.user.create({
            data: userRaw
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) return null;

        return PrismaUserMapper.toDomain(user);
    }

}