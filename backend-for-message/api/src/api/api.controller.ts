import { Controller, Get } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { UserGetAll } from '../contracts/user/getusers.query';

@Controller('api')
export class ApiController {
  constructor(private rmqService: RMQService) {}

  @Get('users')
  async getUsers() {
    return await this.rmqService.send<UserGetAll.Request, UserGetAll.Response>(
      UserGetAll.topic,
      {},
    );
  }
}
