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
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { TaskService } from 'src/services/task.service';
import { CreateTaskDTO } from '../DTO/CreateTaskDTO';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@ApiTags('tasks')
@ApiBearerAuth() // Adiciona a autenticação JWT
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Obtém todas as tarefas do usuário logado' })
    @ApiResponse({ status: 200, description: 'Lista de tarefas' })
    async findAll(@Request() req) {
        const userId = req.user.userId;
        return this.taskService.findAllByUser(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Cria uma nova tarefa para o usuário logado' })
    @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso' })
    async createTask(@Request() req, @Body() createTaskDto: CreateTaskDTO) {
        const userId = req.user.userId;
        return this.taskService.create({ ...createTaskDto, userId });
    }

    @Patch(':id/complete')
    @ApiOperation({
        summary: 'Marca uma tarefa como concluída ou não concluída',
    })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso' })
    async markAsCompleted(
        @Param('id') id: string,
        @Body() body: { isCompleted: boolean },
    ) {
        const numericId = Number(id);
        return this.taskService.markAsCompleted(numericId, body.isCompleted);
    }
}
