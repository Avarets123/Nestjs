import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'message' })
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  fromUser: number;

  @Column()
  message: string;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  toUser: number;
}
