import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from '../dto/create.group.dto';
import { GroupEntity } from '../entity/group.entity';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class GroupRepository {
  constructor(
    @InjectRepository(GroupEntity) private groupRepository: Repository<GroupEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
  ) {}

  async createGroup(dto: CreateGroupDto): Promise<GroupEntity> {
    const newGroup = new GroupEntity();
    Object.assign(newGroup, dto);

    return await this.groupRepository.save(newGroup);
  }

  async getGroupByIdOrAllGroups(id?: number): Promise<GroupEntity | GroupEntity[]> {
    if (id) {
      return await this.groupRepository.findOne({
        where: { id },
        relations: { creator: true, members: true },
      });
    }

    return await this.groupRepository.find({
      relations: { creator: true },
    });
  }

  async addMemberInGroup(groupId: number, userId: number): Promise<GroupEntity> {
    const hasGroup = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: { members: true },
    });
    const hasUser = await this.userRepository.findOneBy({ id: userId });

    if (!hasGroup || !hasUser) {
      throw new HttpException(`Group or user dont exist`, HttpStatus.BAD_REQUEST);
    }
    console.log(hasGroup.members);

    hasGroup.members.push(hasUser);

    return await this.groupRepository.save(hasGroup);
  }
}
