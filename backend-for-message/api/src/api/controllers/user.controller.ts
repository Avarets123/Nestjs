import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { UserDelete } from 'src/contracts/user/user.delete.command';
import { UserGetById } from 'src/contracts/user/user.getById.query';
import { UserLogin } from 'src/contracts/user/user.login.query';
import { UserRegister } from 'src/contracts/user/user.register.command';
import { UserUpdate } from 'src/contracts/user/user.update.command';
import { UserGetAll } from '../../contracts/user/user.getAll.query';
import { RegisterDto } from '../dto/register.dto';

@Controller('user')
export class UserController {
  constructor(private rmqService: RMQService) {}

  @Get('getAll')
  async getUsers() {
    return await this.rmqService.send<UserGetAll.Request, UserGetAll.Response>(UserGetAll.topic, {});
  }

  @Get('get/:id')
  async getUserById(@Param('id') { id }: UserGetById.Request): Promise<UserGetById.Response> {
    return await this.rmqService.send<UserGetById.Request, UserGetById.Response>(UserGetById.topic, { id });
  }

  @Post('register')
  async userRegister(@Body() userData: RegisterDto): Promise<UserRegister.Response> {
    return await this.rmqService.send<UserRegister.Request, UserRegister.Response>(UserRegister.topic, userData);
  }

  @Post('login')
  async userLogin(@Body() userLogin: UserLogin.Request): Promise<UserLogin.Response> {
    return await this.rmqService.send<UserLogin.Request, UserLogin.Response>(UserLogin.topic, userLogin);
  }

  @Put('update/:id')
  async updateUser(@Param('id') userId: number, { userData }: UserUpdate.Request): Promise<UserUpdate.Response> {
    return await this.rmqService.send<UserUpdate.Request, UserUpdate.Response>(UserUpdate.topic, { userId, userData });
  }

  @Delete('delete/:id')
  async deleteUser(@Param() { userId }: UserDelete.Request): Promise<UserDelete.Response> {
    return await this.rmqService.send<UserDelete.Request, UserDelete.Response>(UserDelete.topic, { userId });
  }
}
