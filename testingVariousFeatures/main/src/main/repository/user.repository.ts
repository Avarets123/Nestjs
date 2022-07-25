import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/abstaction/abs.repository';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserSchema } from '../schema/user.schema';

@Injectable()
export class UserRepository implements AbstractRepository<UserSchema> {
  constructor(@InjectRepository(UserSchema) private repository: Repository<UserSchema>) {}

  async getAll(): Promise<UserSchema[]> {
    return await this.repository.find();
  }
  async getOne(email: string): Promise<UserSchema> {
    return await this.repository.findOneBy({ email });
  }
  async delete(id: string | number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  async create(dto: UserSchema): Promise<UserSchema> {
    return await this.repository.save(dto);
  }

  async update(id: any, dto: UserSchema): Promise<UpdateResult> {
    return await this.repository.update(id, dto);
  }
}
