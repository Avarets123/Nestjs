import { Body, Controller } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';
import { UserRepository } from './repository/user.repository';
import { UserGetAll } from '../contracts/user/user.getAll.query';
import { UserGetById } from 'src/contracts/user/user.getById.query';
@Controller()
export class UserQuery {
  constructor(private userRepository: UserRepository) {}

  @RMQRoute(UserGetById.topic)
  async getUserBy(@Body() { id }: UserGetById.Request): Promise<UserGetById.Response> {
    return await this.userRepository.getUserBy(id);
  }

  @RMQRoute(UserGetAll.topic)
  async getAllUsers(): Promise<UserGetAll.Request[]> {
    return this.userRepository.getAllUsers();
  }
}
