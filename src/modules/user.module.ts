import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
    providers: [UserService, PrismaService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
