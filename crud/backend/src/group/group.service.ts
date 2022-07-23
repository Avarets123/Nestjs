import { UserEntity } from '@app/user/entity/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupEntity } from './entity/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity) private readonly groupRepository: Repository<GroupEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllGroupOrOneGroup(groupId?: number): Promise<GroupEntity[] | GroupEntity> {
    if (groupId) {
      return await this.groupRepository.findOne({ id: groupId }, { relations: ['creator', 'users'] });
    }

    const groups = await this.groupRepository.find({ relations: ['creator', 'users'] });
    groups.map((el) => delete el.creator.password);
    return groups;
  }

  async createGroup(createGroupDto: CreateGroupDto, currentUser: UserEntity): Promise<GroupEntity | string> {
    const { name } = createGroupDto;

    const hasGroup = await this.groupRepository.findOne({ name }, { relations: ['users', 'creator'] });
    const user = await this.userRepository.findOne({ id: currentUser.id }, { relations: ['groups'] });

    if (hasGroup) {
      user.groups.push(hasGroup);
      hasGroup.users.push(user);

      await this.userRepository.save(user);
      return await this.groupRepository.save(hasGroup);
    }

    const newGroup = new GroupEntity();
    Object.assign(newGroup, createGroupDto);
    newGroup.creator = user;
    await this.groupRepository.save(newGroup);

    return newGroup;
  }

  async updateGroup(createGroupDto: CreateGroupDto, name: string): Promise<GroupEntity> {
    const hasGroup = await this.groupRepository.findOne({ name });

    if (!hasGroup) {
      throw new HttpException(`Group by ${name} dont excist`, HttpStatus.FORBIDDEN);
    }

    Object.assign(hasGroup, createGroupDto);
    return await this.groupRepository.save(hasGroup);
  }

  async deleteGroup(name: string, currentUserId: number): Promise<DeleteResult> {
    const hasGroup = await this.groupRepository.findOne({ name });

    if (!hasGroup) {
      throw new HttpException(`Group by ${name} dont excist`, HttpStatus.FORBIDDEN);
    }

    if (hasGroup.creator.id === currentUserId) {
      return await this.groupRepository.delete({ name });
    } else {
      throw new HttpException('У вас нет прав', HttpStatus.FORBIDDEN);
    }
  }
}
