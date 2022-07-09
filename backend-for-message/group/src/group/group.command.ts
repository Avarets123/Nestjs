import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateGroupDto } from './dto/create.group.dto';
import { CreateMessageGroup } from './dto/create.messageGroup.dto';
import { GroupEntity } from './entity/group.entity';
import { GroupRepository } from './repository/group.repository';

@Controller('group')
export class GroupCommand {
  constructor(private groupRepository: GroupRepository) {}

  @Post('create')
  async createGroup(@Body() dto: CreateGroupDto): Promise<GroupEntity> {
    return await this.groupRepository.createGroup(dto);
  }

  @Post('addMember')
  async addMemberInGroup(@Body() data: { groupId: number; userId: number }): Promise<GroupEntity> {
    return await this.groupRepository.addMemberInGroup(data.groupId, data.userId);
  }

  @Post('sendMessage')
  async addMessageGroup(@Body() dto: CreateMessageGroup): Promise<GroupEntity> {
    return await this.groupRepository.addMessageGroup(dto);
  }

  @Post('delMember')
  async deleteMember(@Body() dto: { groupId: number; creatorId: number; delUserLogin: string }): Promise<GroupEntity> {
    return await this.groupRepository.delMemberGroup(dto.groupId, dto.creatorId, dto.delUserLogin);
  }

  @Delete('delete')
  async delGroup(@Body('groupId') groupId: number): Promise<DeleteResult> {
    return await this.groupRepository.deleteGroup(groupId);
  }
}
