import { Injectable } from '@nestjs/common';
import { UserSchema } from './schema/user.schema';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/user.create.dto';

@Injectable()
export class MainService {
  constructor(private userRepository: UserRepository) {}

  async createUser(dto: CreateUserDto): Promise<UserSchema> {
    let newUser = new UserSchema();
    Object.assign(newUser, dto);

    newUser = await this.userRepository.create(newUser);

    console.log(newUser);
    return newUser;
  }
}
