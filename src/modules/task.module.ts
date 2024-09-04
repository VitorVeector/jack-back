import { Module } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { TaskController } from '../controllers/task.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
    imports: [],
    providers: [TaskService, PrismaService],
    controllers: [TaskController],
    exports: [TaskService],
})
export class TaskModule {}
