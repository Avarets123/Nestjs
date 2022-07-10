import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { rmqConfig } from 'src/config/rmq.config';

@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    RMQModule.forRootAsync(rmqConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
