import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ICreateMessage } from '../dto/create.messageGroup.dto';
import { MessageEntity } from './message.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'group' })
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  creator: number;

  @OneToMany(() => MessageEntity, (mess) => mess.group)
  @JoinColumn()
  messages: ICreateMessage[];

  @ManyToMany(() => UserEntity)
  @JoinTable()
  members: UserEntity[];
}
