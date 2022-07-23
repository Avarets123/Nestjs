import { hash } from 'bcrypt';
import { Exclude, Transform } from 'class-transformer';
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

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

  @Column({ nullable: true })
  refreshToken: string;

  @BeforeInsert()
  private async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 9);
  }
}
