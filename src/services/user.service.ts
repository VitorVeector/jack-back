import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { CreateUserDTO } from '../DTO/CreateUserDTO';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                username: true,
                password: true,
                isActive: true,
            },
        });
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { username },
        });
    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany({
            include: { tasks: true },
        });
    }

    async findOne(id: number): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { tasks: true },
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async create(createUserDto: CreateUserDTO): Promise<User> {
        const user = await this.prisma.user.create({
            data: createUserDto,
        });
        return user;
    }

    async update(
        id: number,
        updateUserDto: Partial<CreateUserDTO>,
    ): Promise<User> {
        const user = await this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async remove(id: number): Promise<User> {
        const user = await this.prisma.user.delete({
            where: { id },
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
}
