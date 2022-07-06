import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { UserCommand } from './user.command';
import { UserQuery } from './user.query';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserCommand, UserQuery],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
