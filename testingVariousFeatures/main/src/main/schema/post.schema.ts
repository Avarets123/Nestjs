import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from '../entity/post.entity';
import { UserSchema } from './user.schema';

@Entity('posts')
export class PostSchema implements PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => UserSchema, (user) => user.posts)
  author: UserSchema;
}
