import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { iSignin } from './auth.interface';
import { UsersService } from '../users/users.service';
import { SigninUserDto } from 'src/utils/dto/signinUser.dto';
import { CreateUserDto } from 'src/utils/dto/createUser.dto';
import { comparePassword, hashPassword } from 'src/utils/helper';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signUp(payload: CreateUserDto): Promise<iSignin> {
    const query = { email: payload.email };
    const user = await this.usersService.findUser({ query });

    if (user) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await hashPassword(payload.password);
    payload.password = hashedPassword;

    const createdUser = await this.usersService.createUser(payload);

    const result = { name: createdUser.name, email: createdUser.email };

    return {
      ...result,
      cookie: await this.generateCookieToken({
        ...result,
        _id: createdUser._id,
      }),
    };
  }

  async signIn(payload: SigninUserDto): Promise<iSignin> {
    const query = { email: payload.email };
    const user = await this.usersService.findUser({
      query,
      select: 'name email password',
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatch = await comparePassword(payload.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const result = { name: user.name, email: user.email };

    return {
      ...result,
      cookie: await this.generateCookieToken({ ...result, _id: user._id }),
    };
  }

  async generateCookieToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
