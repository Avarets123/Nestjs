import { Controller, Get, Param } from '@nestjs/common';
import { GroupEntity } from './entity/group.entity';
import { GroupRepository } from './repository/group.repository';

@Controller('groups')
export class GroupQuery {
  constructor(private groupRepository: GroupRepository) {}

  @Get(':id')
  async getGroupById(@Param('id') id: number): Promise<GroupEntity | GroupEntity[]> {
    return await this.groupRepository.getGroupByIdOrAllGroups(id);
  }

  @Get()
  async getAllGroup(): Promise<GroupEntity[] | GroupEntity> {
    return await this.groupRepository.getGroupByIdOrAllGroups();
  }
}
