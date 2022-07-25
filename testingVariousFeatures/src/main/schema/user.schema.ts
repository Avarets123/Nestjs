import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { PostSchema } from './post.schema';

@Entity('user')
export class UserSchema implements UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name?: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  // @Transform((value) => {
  //   if (value !== null) {
  //     return value;
  //   }
  // })
  age?: number;

  @Exclude()
  @Column({ nullable: true })
  refreshToken: string;

  @OneToMany(() => PostSchema, (post) => post.author, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  posts: PostSchema[];

  @BeforeInsert()
  private async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 9);
  }
}
