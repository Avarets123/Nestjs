import { Body, Controller } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';
import { UserDelete } from 'src/contracts/user/user.delete.command';
import { UserUpdate } from 'src/contracts/user/user.update.command';
import { UserRepository } from './repository/user.repository';

@Controller()
export class UserCommand {
  constructor(private userRepository: UserRepository) {}

  @RMQRoute(UserUpdate.topic)
  async updateUser(@Body() { userData, userId }: UserUpdate.Request): Promise<UserUpdate.Response> {
    return await this.userRepository.updateUser(userData, userId);
  }

  @RMQRoute(UserDelete.topic)
  async deleteUser({ userId }: UserDelete.Request): Promise<UserDelete.Response> {
    return await this.userRepository.deleteUser(userId);
  }
}
