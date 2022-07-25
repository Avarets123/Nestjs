import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './authentication/auth.service';
import { JwtAuthGuard } from './authentication/jwt.strategy';
import { LocalAuthGuard } from './authentication/local.strategy';
import { CreatePostDto } from './dto/post.create.dto';
import { CreateUserDto } from './dto/user.create.dto';
import { LoginUserDto } from './dto/user.login.dto';
import { IReqWithUser } from './interface/reqWithUser.interface';
import { MainService } from './main.service';
import { PostSchema } from './schema/post.schema';
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
  async getCurrentUser(@Req() req: IReqWithUser) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('post')
  async createPost(@Body() dto: CreatePostDto, @Req() req: IReqWithUser) {
    return await this.mainService.createPost(req.user.id, dto);
  }

  @Get('post')
  async getAllPosts(@Query() { offset, limit }): Promise<PostSchema[]> {
    return await this.mainService.getAllPosts(offset, limit);
  }
}
