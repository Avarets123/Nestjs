import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create.user.dto';
import { UpdateUserDto } from '../dto/update.user.dto';
import { UserEntity } from '../entities/user.entity';
import { hash } from 'bcryptjs';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const { email } = dto;

    const oldUser = await this.userRepository.findOneBy({ email });

    if (oldUser) {
      throw new HttpException(
        'Пользователь с таким email уже зарегистрирован',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = new UserEntity();
    Object.assign(newUser, dto);

    return await this.userRepository.save(newUser);
  }

  async deleteUser(userId?: number, email?: string): Promise<DeleteResult> {
    let hasUser: UserEntity;

    if (userId) {
      hasUser = await this.userRepository.findOneBy({ id: userId });
    }

    if (email) {
      hasUser = await this.userRepository.findOneBy({ email });
    }

    if (!hasUser) {
      throw new HttpException(
        'Пользователь с таким id не сущетсвует',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.userRepository.delete({ id: userId });
  }

  async updateUser(dto: UpdateUserDto, userId: string): Promise<UserEntity> {
    const { password } = dto;

    const hasUser = await this.userRepository.findOneBy({ id: +userId });

    if (!hasUser) {
      throw new HttpException(
        'Пользователь с таким email не существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    Object.assign(hasUser, dto);
    hasUser.password = await hash(password, 9);

    return await this.userRepository.save(hasUser);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getUserBy(
    id?: number,
    email?: string,
    login?: string,
  ): Promise<UserEntity> {
    return id
      ? await this.userRepository.findOneBy({ id })
      : email
      ? await this.userRepository.findOneBy({ email })
      : await this.userRepository.findOneBy({ login });
  }
}
