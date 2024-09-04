import { Module } from '@nestjs/common';
import { TaskModule } from './modules/task.module';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';

@Module({
    imports: [AuthModule, TaskModule, UserModule],
    providers: [],
})
export class AppModule {}
