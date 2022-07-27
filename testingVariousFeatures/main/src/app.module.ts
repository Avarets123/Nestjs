import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeormConfig } from './config/typeorm.config';
import { MainModule } from './main/main.module';

@Module({
  imports: [
    MainModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRootAsync(typeormConfig()),
    AutomapperModule.forRoot({
      options: [{ name: 'common', pluginInitializer: classes }],
      singular: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
