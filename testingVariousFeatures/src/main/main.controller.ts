import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './authentication/auth.service';
import { JwtAuthGuard } from './authentication/jwt.strategy';
import { LocalAuthGuard } from './authentication/local.strategy';
import { CreateUserDto } from './dto/user.create.dto';
import { LoginUserDto } from './dto/user.login.dto';
import { MainService } from './main.service';
import { UserSchema } from './schema/user.schema';

@Controller('api/user')
@UseInterceptors(ClassSerializerInterceptor)
export class MainController {
  constructor(private mainService: MainService, private authService: AuthService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<UserSchema> {
    return await this.mainService.createUser(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getCurrentUser(@Req() req: Request) {
    return req.user;
  }
}
