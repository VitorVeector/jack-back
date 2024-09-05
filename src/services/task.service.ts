import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { CreateTaskDTO } from '../DTO/CreateTaskDTO';

@Injectable()
export class TaskService {
    constructor(private readonly prisma: PrismaService) {}

    async findAllByUser(userId: number) {
        if (!userId) {
            throw new BadRequestException('User ID must be provided');
        }
        return this.prisma.task.findMany({
            where: {
                userId: Number(userId),
            },
        });
    }

    async create(createTaskDto: CreateTaskDTO) {
        const { userId, ...taskData } = createTaskDto;

        if (!userId) {
            throw new BadRequestException(
                'User ID must be provided for task creation',
            );
        }

        const userExists = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!userExists) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        return this.prisma.task.create({
            data: {
                ...taskData,
                user: { connect: { id: userId } },
            },
        });
    }

    async markAsCompleted(id: number) {
        const task = await this.prisma.task.findUnique({
            where: { id },
        });

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return this.prisma.task.update({
            where: { id },
            data: { isCompleted: true },
        });
    }

    async deleteTask(id: number): Promise<void> {
        try {
            await this.prisma.task.delete({
                where: { id },
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }
}
