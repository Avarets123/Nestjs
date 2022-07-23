import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './schema/user.schema';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { UserRepository } from './repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './authentication/auth.service';
import { LocalStrategy } from './authentication/local.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
    //   }),
    // }),
    TypeOrmModule.forFeature([UserSchema]),
  ],
  controllers: [MainController],
  providers: [AuthService, MainService, UserRepository, LocalStrategy],
})
export class MainModule {}
