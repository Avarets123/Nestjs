import { ignore, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { CreateUserDto } from '../dto/user.create.dto';
import { UserSchema } from '../schema/user.schema';

export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile(): MappingProfile {
    return (mapper) => {
      mapper.createMap(UserSchema, CreateUserDto).forMember((ent) => ent.password, ignore());
      mapper.createMap(CreateUserDto, UserSchema).forMember((ent) => ent.id, ignore());
    };
  }
}
