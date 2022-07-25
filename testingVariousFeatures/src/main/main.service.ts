import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserSchema } from './schema/user.schema';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/user.create.dto';
import { LoginUserDto } from './dto/user.login.dto';
import { CreatePostDto } from './dto/post.create.dto';
import { DataSource } from 'typeorm';
import { PostSchema } from './schema/post.schema';

@Injectable()
export class MainService {
  constructor(private userRepository: UserRepository, private connection: DataSource) {}

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

  async createPost(userId: number, dto: CreatePostDto) {
    const queryRunner = this.connection.createQueryRunner();

    queryRunner.connect();
    queryRunner.startTransaction();

    try {
      const newPost = await queryRunner.manager.save(PostSchema, Object.assign(new PostSchema(), dto));
      const user = await queryRunner.manager.findOneBy(UserSchema, { id: userId });
      user.posts.push(newPost);
      await queryRunner.manager.save(UserSchema, user);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(('Error in transaction ' + error) as string);
    } finally {
      await queryRunner.release();
    }
  }

  async getAllPosts(): Promise<PostSchema[]> {
    return await this.connection.manager.find(PostSchema, {
      relations: {
        author: true,
      },
    });
  }
}
