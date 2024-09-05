import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { TaskService } from 'src/services/task.service';
import { CreateTaskDTO } from '../DTO/CreateTaskDTO';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    async findAll(@Query('userId') userId: number) {
        return this.taskService.findAllByUser(userId);
    }

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDTO) {
        return this.taskService.create(createTaskDto);
    }

    @Patch(':id/complete')
    async markAsCompleted(@Param('id') id: number) {
        return this.taskService.markAsCompleted(id);
    }
}
