import { Controller, Get, Param } from '@nestjs/common';
import { MessageEntity } from './entity/message.entity';
import { MessageRepository } from './repository/message.repository';

@Controller('messages')
export class MessageQuery {
  constructor(private messageRepository: MessageRepository) {}

  @Get(':id')
  async getMessageByUserId(@Param('id') id: string): Promise<MessageEntity[]> {
    return await this.messageRepository.getMessageByUserId(+id);
  }

  @Get()
  async getMessage(): Promise<MessageEntity[]> {
    return await this.messageRepository.getAllMessages();
  }
}
