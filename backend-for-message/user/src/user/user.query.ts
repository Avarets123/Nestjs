import { Controller, Get, Param } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';

@Controller()
export class UserQuery {
  constructor(private userRepository: UserRepository) {}

  @Get('user/:id')
  async getUserBy(@Param('id') id: string): Promise<UserEntity> {
    return await this.userRepository.getUserBy(+id);
  }

  @Get('users')
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.getAllUsers();
  }
}
