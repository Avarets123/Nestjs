import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './schema/user.schema';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [MainController],
  providers: [MainService, UserRepository],
})
export class MainModule {}
