import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { MainService } from '../main.service';
import { UserSchema } from '../schema/user.schema';

@Injectable()
export class AuthService {
  constructor(private mainService: MainService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<UserSchema | null> {
    const user = await this.mainService.getUserByEmail(email);

    const isValidPass = await compare(password, user.password);

    if (user && isValidPass) {
      return user;
    }

    return null;
  }

  async login(user: any): Promise<{ accessToken: string }> {
    const payload = { ...user };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
