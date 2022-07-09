import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './entity/group.entity';
import { MessageEntity } from './entity/message.entity';
import { UserEntity } from './entity/user.entity';
import { GroupCommand } from './group.command';
import { GroupQuery } from './group.query';
import { GroupRepository } from './repository/group.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity, UserEntity, MessageEntity])],
  providers: [GroupRepository],
  controllers: [GroupCommand, GroupQuery],
})
export class GroupModule {}
