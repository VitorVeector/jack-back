import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Realiza o login do usuário' })
    @ApiResponse({ status: 200, description: 'Token JWT gerado com sucesso' })
    @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
    async login(@Body() body: { username: string; password: string }) {
        const user = await this.authService.validateUser(
            body.username,
            body.password,
        );
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }
}
