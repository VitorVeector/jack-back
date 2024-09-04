import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { TaskService } from 'src/services/task.service';
import { CreateTaskDTO } from '../DTO/CreateTaskDTO';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    async findAll() {
        return this.taskService.findAll();
    }

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDTO) {
        return this.taskService.create(createTaskDto);
    }

    @Patch(':id/complete')
    async markAsCompleted(@Param('id') id: number) {
        return this.taskService.markAsCompleted(id);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.taskService.deleteTask(id);
    }
}
