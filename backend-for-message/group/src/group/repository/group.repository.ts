import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateGroupDto } from '../dto/create.group.dto';
import { CreateMessageGroup } from '../dto/create.messageGroup.dto';
import { GroupEntity } from '../entity/group.entity';
import { MessageEntity } from '../entity/message.entity';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class GroupRepository {
  constructor(
    @InjectRepository(GroupEntity) private groupRepository: Repository<GroupEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(MessageEntity) private messageRepository: Repository<MessageEntity>,
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
        relations: { creator: true, members: true, messages: true },
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

    hasGroup.members.push(hasUser);

    return await this.groupRepository.save(hasGroup);
  }

  async deleteGroup(groupId: number): Promise<DeleteResult> {
    return await this.groupRepository.delete({ id: groupId });
  }

  async addMessageGroup(dto: CreateMessageGroup): Promise<GroupEntity> {
    const { message, groupId } = dto;

    const hasGroup = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: { messages: true },
    });

    if (!hasGroup) {
      throw new HttpException(`Group dont exist`, HttpStatus.BAD_REQUEST);
    }

    const newMessage = new MessageEntity();
    Object.assign(newMessage, message);

    hasGroup.messages.push(newMessage);

    await this.messageRepository.save(newMessage);
    return await this.groupRepository.save(hasGroup);
  }

  async delMemberGroup(groupId: number, creatorId: number, delUserLogin: string): Promise<GroupEntity> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: { members: true, creator: true },
    });

    //@ts-ignore
    if (!group || group.creator.id !== creatorId) {
      throw new HttpException('У вас нет прав !', HttpStatus.FORBIDDEN);
    }

    group.members = group.members.filter((user) => user.login !== delUserLogin);
    return await this.groupRepository.save(group);
  }
}
