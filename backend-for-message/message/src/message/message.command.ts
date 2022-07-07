import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateMessage } from './dto/create.message.dto';
import { UpdateMessageDto } from './dto/update.message.dto';
import { MessageEntity } from './entity/message.entity';
import { MessageRepository } from './repository/message.repository';

@Controller('message')
export class MessageCommand {
  constructor(private messageRepository: MessageRepository) {}

  @Post('create')
  async createMessage(@Body() message: CreateMessage): Promise<MessageEntity> {
    return await this.messageRepository.createMessage(message);
  }

  @Put(':id')
  async updateMessage(
    @Param('id') id: number,
    @Body() updateMessage: UpdateMessageDto,
  ): Promise<MessageEntity> {
    return await this.messageRepository.updateMessageById(id, updateMessage);
  }

  @Delete(':id')
  async deleteMessage(@Param('id') id: number): Promise<DeleteResult> {
    return await this.messageRepository.deleteMessageById(id);
  }
}
