import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { iEnvirontVariables } from 'src/config/config.validation';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configServie: ConfigService<iEnvirontVariables>) => ({
        secret: configServie.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configServie.get<string>('JWT_EXPIRATION_TIME'),
        },
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
