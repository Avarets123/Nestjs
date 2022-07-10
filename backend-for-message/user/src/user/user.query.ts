import { Controller, Get, Param } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { UserGetAll } from '../contracts/user/getusers.query';
@Controller()
export class UserQuery {
  constructor(private userRepository: UserRepository) {}

  @Get('user/:id')
  async getUserBy(@Param('id') id: string): Promise<UserEntity> {
    return await this.userRepository.getUserBy(+id);
  }

  @RMQRoute(UserGetAll.topic)
  async getAllUsers(): Promise<UserGetAll.Request[]> {
    return this.userRepository.getAllUsers();
  }
}
