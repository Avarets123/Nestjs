import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './schema/user.schema';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { UserRepository } from './repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './authentication/auth.service';
import { LocalStrategy } from './authentication/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './authentication/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: '5m',
        },
      }),
    }),
    TypeOrmModule.forFeature([UserSchema]),
  ],
  controllers: [MainController],
  providers: [AuthService, MainService, UserRepository, LocalStrategy, JwtStrategy],
})
export class MainModule {}
