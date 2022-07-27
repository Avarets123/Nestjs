import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeormConfig = (): TypeOrmModuleAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get('POSTGRES_HOST'),
    port: 5433,
    username: config.get('POSTGRES_USER'),
    database: config.get('POSTGRES_DB_MAIN'),
    password: config.get('POSTGRES_PASSWORD'),
    autoLoadEntities: true,
    synchronize: true,
    // logging: true,
    entities: [__dirname + '**/*.entity{.ts,.js}'],
  }),
});
