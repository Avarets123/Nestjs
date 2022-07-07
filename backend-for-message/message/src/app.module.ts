import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { typeormConfig } from './config/typeorm.config';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    MessageModule,
    TypeOrmModule.forRootAsync(typeormConfig()),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
