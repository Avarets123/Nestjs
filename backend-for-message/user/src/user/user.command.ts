import { Body, Controller, Delete, Param, Put } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';

@Controller('user')
export class UserCommand {
  constructor(private userRepository: UserRepository) {}

  @Put('update/:id')
  async updateUser(
    @Body() dto: UpdateUserDto,
    @Param('id') userId: string,
  ): Promise<UserEntity> {
    return await this.userRepository.updateUser(dto, userId);
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') userId: string): Promise<DeleteResult> {
    return await this.userRepository.deleteUser(+userId);
  }
}
