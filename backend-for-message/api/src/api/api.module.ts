import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { UserController } from './controllers/user.controller';

@Module({
  providers: [ApiService],
  controllers: [UserController],
})
export class ApiModule {}
