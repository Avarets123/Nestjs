import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserSchema } from './schema/user.schema';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/user.create.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from './dto/user.login.dto';

@Injectable()
export class MainService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserSchema> {
    let newUser = new UserSchema();

    const hasUser = await this.userRepository.getOne(dto.email);

    if (hasUser) {
      throw new HttpException(`User by email: ${dto.email} exist`, HttpStatus.BAD_REQUEST);
    }

    Object.assign(newUser, dto);

    newUser = await this.userRepository.create(newUser);

    return newUser;
  }

  async getUserByEmail(email: string): Promise<UserSchema> {
    return await this.userRepository.getOne(email);
  }

  async loginUser(dto: LoginUserDto) {}
}
