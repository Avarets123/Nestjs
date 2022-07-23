import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeormConfig = (): TypeOrmModuleAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get('POSTGRES_HOST'),
    port: config.get('POSTGRES_PORT'),
    username: config.get('POSTGRES_USER'),
    database: config.get('POSTGRES_DB'),
    password: config.get('POSTGRES_PASSWORD'),
    autoLoadEntities: true,
    synchronize: true,
    // logging: true,
    entities: [__dirname + '**/*.entity{.ts,.js}'],
  }),
});
