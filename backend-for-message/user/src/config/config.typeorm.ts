import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const configTypeorm = (): TypeOrmModuleAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: 'localhost',
    port: config.get<number>('POSTGRES_PORT'),
    database: config.get('POSTGRES_DB'),
    username: config.get('POSTGRES_USER'),
    password: config.get('POSTGRES_PASSWORD'),
    entities: [__dirname + '**/*.entity{.ts,.js}'],
    synchronize: true,
    // logging: true,
    autoLoadEntities: true,
  }),
});
