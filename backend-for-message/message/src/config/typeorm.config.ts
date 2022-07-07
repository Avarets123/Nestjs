import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeormConfig = (): TypeOrmModuleAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: 'localhost',
    port: config.get<number>('POSTGRES_PORT'),
    username: config.get('POSTGRES_USER'),
    database: config.get('POSTGRES_DB'),
    password: config.get('POSTGRES_PASSWORD'),
    entities: [__dirname + '**/*.entity{.ts,.js}'],
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
  }),
});
