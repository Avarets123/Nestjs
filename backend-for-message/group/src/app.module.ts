import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModule } from './group/group.module';
import { typeormConfig } from './config/typeorm.config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRootAsync(typeormConfig),
    GroupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
