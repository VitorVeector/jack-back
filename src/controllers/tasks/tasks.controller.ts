import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './DTO/CreateTaskDTO';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    async findAll(): Promise<Task[]> {
        return this.taskService.findAll();
    }

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto);
    }

    @Patch(':id/complete')
    async markAsCompleted(@Param('id') id: number): Promise<Task> {
        return this.taskService.markAsCompleted(id);
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: number): Promise<void> {
        return this.taskService.deleteTask(id);
    }
}
