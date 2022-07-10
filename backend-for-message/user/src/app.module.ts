import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configTypeorm } from './config/config.typeorm';
import { RMQModule } from 'nestjs-rmq';
import { rmqConfig } from './config/rmq.config';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRootAsync(configTypeorm()),
    RMQModule.forRootAsync(rmqConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
