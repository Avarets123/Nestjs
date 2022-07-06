import { Body, Controller, Post } from '@nestjs/common';
import { IResUserWithToken } from 'src/interfaces/resp.user.withToken';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async createUser(@Body() dto: CreateUserDto): Promise<IResUserWithToken> {
    return await this.authService.registerUser(dto);
  }

  @Post('login')
  async loginUser(
    @Body() dto: LoginDto,
  ): Promise<{ email: string; token: string }> {
    return await this.authService.login(dto);
  }
}
