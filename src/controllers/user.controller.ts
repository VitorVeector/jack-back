import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { CreateUserDTO } from '../DTO/CreateUserDTO';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDTO) {
        return this.userService.create(createUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.userService.remove(id);
    }
}
