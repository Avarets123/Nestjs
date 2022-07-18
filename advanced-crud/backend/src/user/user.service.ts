import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entity/user.entity';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { myJwtSecret } from '@app/jwtsecret';
import { IUserResponse } from './interfaces/response-user.interface';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async currentUser(currentUserId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      { id: currentUserId },
      {
        relations: ['createGroup', 'groups', 'friends'],
      },
    );

    user.createGroup.map((el) => delete el.creator);

    delete user.password;

    return user;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();

    return users.map((el) => {
      delete el.password;
      return el;
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<IUserResponse> {
    const { email, password } = createUserDto;

    const hasUser = await this.userRepository.findOne({ email });

    if (hasUser) {
      throw new HttpException(`User by email: ${email} excist`, HttpStatus.CONFLICT);
    }

    const hashPassword = await hash(password, 8);

    const newUser = new UserEntity();

    Object.assign(newUser, createUserDto);
    newUser.password = hashPassword;

    await this.userRepository.save(newUser);

    delete newUser.password;

    return {
      user: { ...newUser },
      token: this.generateToken(newUser),
    };
  }

  private generateToken(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      myJwtSecret,
      { expiresIn: '3d' },
    );
  }

  async loginUser(loginUser: LoginUserDto): Promise<any> {
    const { email, password } = loginUser;

    const hasUser = await this.userRepository.findOne({ email });

    if (!hasUser) {
      throw new HttpException('User doesnt excist', HttpStatus.FORBIDDEN);
    }

    const validPass = await compare(password, hasUser.password);

    if (!validPass) {
      throw new HttpException('Password dont valid', HttpStatus.BAD_REQUEST);
    }

    delete hasUser.password;

    return {
      user: { ...hasUser },
      token: this.generateToken(hasUser),
    };
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  async addFriend(currentUserId: number, nameFriend: string): Promise<UserEntity> {
    const findFriend = await this.userRepository.findOne({ name: nameFriend });
    const currentUser = await this.userRepository.findOne({ id: currentUserId }, { relations: ['friends'] });

    if (!findFriend) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    currentUser.friends.push(findFriend.id);
    return await this.userRepository.save(currentUser);
  }

  async delFriend(currentUserId: number, nameFriend: string): Promise<UserEntity> {
    const findFriend = await this.userRepository.findOne({ name: nameFriend });
    const currentUser = await this.userRepository.findOne({ id: currentUserId }, { relations: ['friends'] });

    if (!findFriend) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    currentUser.friends = currentUser.friends.filter((el) => el !== findFriend.id);

    return await this.userRepository.save(currentUser);
  }
}
