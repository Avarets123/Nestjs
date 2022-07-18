import { UserEntity } from '@app/user/entity/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './entity/group.entity';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity, UserEntity])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
