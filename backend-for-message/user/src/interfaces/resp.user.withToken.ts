import { UserEntity } from 'src/user/entities/user.entity';

export interface IResUserWithToken {
  user: UserEntity;
  token: string;
}
