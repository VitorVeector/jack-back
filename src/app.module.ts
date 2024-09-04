import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks/tasks.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './controllers/tasks/task.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'database.sqlite',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        TaskModule,
    ],
    controllers: [TasksController],
    providers: [AppService],
})
export class AppModule {}
