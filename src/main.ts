import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Jack Experts API')
        .setDescription('A API para o sistema de tarefas e usuários')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    await app.listen(8080);
}
bootstrap();
