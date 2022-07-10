import { UserEntity } from 'src/user/entity/user.entity';

export interface IResUserWithToken {
  user: UserEntity;
  token: string;
}
