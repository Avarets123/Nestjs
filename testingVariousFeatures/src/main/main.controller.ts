import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from './authentication/local.strategy';
import { CreateUserDto } from './dto/user.create.dto';
import { LoginUserDto } from './dto/user.login.dto';
import { MainService } from './main.service';
import { UserSchema } from './schema/user.schema';

@Controller('api/user')
@UseInterceptors(ClassSerializerInterceptor)
export class MainController {
  constructor(private mainService: MainService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<UserSchema> {
    return await this.mainService.createUser(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Body() dto: LoginUserDto, @Req() req: Request) {
    return req.user;
  }
}
