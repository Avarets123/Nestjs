import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entity/message.entity';
import { UserEntity } from './entity/user.entity';
import { MessageCommand } from './message.command';
import { MessageQuery } from './message.query';
import { MessageService } from './message.service';
import { MessageRepository } from './repository/message.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, UserEntity])],
  providers: [MessageService, MessageRepository],
  controllers: [MessageCommand, MessageQuery],
})
export class MessageModule {}
