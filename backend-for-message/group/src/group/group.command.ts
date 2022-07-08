import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('get/:id')
  async getGroupById(@Param('id') id: number): Promise<GroupEntity | GroupEntity[]> {
    return await this.groupRepository.getGroupByIdOrAllGroups(id);
  }

  @Get('get')
  async getAllGroup(): Promise<GroupEntity[] | GroupEntity> {
    return await this.groupRepository.getGroupByIdOrAllGroups();
  }

  @Post('addMember')
  async addMemberInGroup(@Body() data: { groupId: number; userId: number }): Promise<GroupEntity> {
    return await this.groupRepository.addMemberInGroup(data.groupId, data.userId);
  }

  @Post('sendMessage')
  async addMessageGroup(@Body() dto: CreateMessageGroup): Promise<GroupEntity> {
    return await this.groupRepository.addMessageGroup(dto);
  }
}
