import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserService } from 'src/services/user.service';
import { CreateUserDTO } from '../DTO/CreateUserDTO';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOperation({ summary: 'Obtém todos os usuários' })
    @ApiResponse({ status: 200, description: 'Lista de usuários' })
    async findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtém um usuário pelo ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Usuário encontrado' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    async findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @Post('register')
    @ApiOperation({ summary: 'Cria um novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
    async create(@Body() createUserDto: CreateUserDTO) {
        return this.userService.create(createUserDto);
    }
}
