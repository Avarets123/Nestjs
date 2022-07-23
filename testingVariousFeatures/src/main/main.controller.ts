import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/user.create.dto';
import { MainService } from './main.service';
import { UserSchema } from './schema/user.schema';

@Controller('api/user')
@UseInterceptors(ClassSerializerInterceptor)
export class MainController {
  constructor(private mainService: MainService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<UserSchema> {
    return await this.mainService.createUser(dto);
  }
}
