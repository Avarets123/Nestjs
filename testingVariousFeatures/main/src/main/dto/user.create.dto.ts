import { AutoMap } from '@automapper/classes';

export class CreateUserDto {
  @AutoMap()
  email: string;

  @AutoMap()
  password: string;

  @AutoMap()
  name?: string;
}
