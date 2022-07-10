import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/repository/user.repository';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcryptjs';
import { RegisterUserDto } from './dto/register.user.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { IResUserWithToken } from 'src/interfaces/resp.user.withToken';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async login(dto: LoginDto): Promise<{ email: string; token: string }> {
    const { email, password } = dto;
    const user = await this.userRepository.getUserBy(null, email);

    if (!user) {
      throw new HttpException(
        'Пользователь с таким email не существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const checkPass = await compare(password, user.password);

    if (!checkPass) {
      throw new HttpException(
        'Неправильно задан пароль',
        HttpStatus.BAD_GATEWAY,
      );
    }

    return {
      email,
      token: this.generateToken(user.id.toString()),
    };
  }

  async registerUser(dto: RegisterUserDto): Promise<IResUserWithToken> {
    const { email } = dto;

    const user = await this.userRepository.getUserBy(null, email);

    if (user) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    let newUser = new UserEntity();
    Object.assign(newUser, dto);
    newUser = await this.userRepository.createUser(newUser);

    return {
      user: newUser,
      token: this.generateToken(newUser.id.toString()),
    };
  }

  private generateToken(data: string): string {
    return this.jwtService.sign(data);
  }
}
