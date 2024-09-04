import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TasksController } from '../tasks/tasks.controller';
import { Task } from './task.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    providers: [TaskService],
    controllers: [TasksController],
    exports: [TaskService],
})
export class TaskModule {}
