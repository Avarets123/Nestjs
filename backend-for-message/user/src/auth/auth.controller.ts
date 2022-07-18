import { Body, Controller } from '@nestjs/common';
import { RMQRoute } from 'nestjs-rmq';
import { UserLogin } from 'src/contracts/user/user.login.query';
import { UserRegister } from 'src/contracts/user/user.register.command';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @RMQRoute(UserRegister.topic)
  async createUser(@Body() dto: UserRegister.Request): Promise<UserRegister.Response> {
    return await this.authService.registerUser(dto);
  }

  @RMQRoute(UserLogin.topic)
  async loginUser(@Body() dto: UserLogin.Request): Promise<UserLogin.Response> {
    return await this.authService.login(dto);
  }
}
