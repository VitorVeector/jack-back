import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const DbConnection = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async (configService: ConfigService) => {
            const dataSource = new DataSource({
                type: 'sqlite',
                database:
                    configService.get<string>('DATABASE_NAME') ||
                    'database.sqlite',
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: true,
            });

            return dataSource.initialize();
        },
        inject: [ConfigService],
    },
];
