import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { TaskService } from 'src/services/task.service';
import { CreateTaskDTO } from '../DTO/CreateTaskDTO';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() req) {
        const userId = req.user.userId;
        return this.taskService.findAllByUser(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createTask(@Request() req, @Body() createTaskDto: CreateTaskDTO) {
        const userId = req.user.userId;
        return this.taskService.create({ ...createTaskDto, userId });
    }

    @Patch(':id/complete')
    async markAsCompleted(
        @Param('id') id: string,
        @Body() body: { isCompleted: boolean },
    ) {
        const numericId = Number(id);
        return this.taskService.markAsCompleted(numericId, body.isCompleted);
    }
}
