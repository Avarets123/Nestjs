import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateMessage } from '../dto/create.message.dto';
import { UpdateMessageDto } from '../dto/update.message.dto';
import { MessageEntity } from '../entity/message.entity';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {}

  async createMessage(dto: CreateMessage): Promise<MessageEntity> {
    const newMessage = new MessageEntity();
    Object.assign(newMessage, dto);

    return await this.messageRepository.save(newMessage);
  }

  async deleteMessageById(id: number): Promise<DeleteResult> {
    return await this.messageRepository.delete({ id });
  }

  async updateMessageById(
    id: number,
    dto: UpdateMessageDto,
  ): Promise<MessageEntity> {
    const hasMessage = await this.messageRepository.findOne({ where: { id } });

    if (!hasMessage) {
      throw new HttpException(
        'Такое сообщение не существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    Object.assign(hasMessage, dto);

    return await this.messageRepository.save(hasMessage);
  }

  async getMessageByUserId(id: number): Promise<MessageEntity[]> {
    return await this.messageRepository.find({
      where: { fromUser: id },
      relations: { toUser: true, fromUser: true },
      order: { id: 'DESC' },
    });
  }

  async getAllMessages(): Promise<MessageEntity[]> {
    return await this.messageRepository.find();
  }
}
