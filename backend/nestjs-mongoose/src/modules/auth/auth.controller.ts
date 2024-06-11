import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Body, Controller, Post, Req } from '@nestjs/common';

import { AuthService } from './auth.service';
import { setCookie } from 'src/utils/helper';
import { SigninUserDto } from 'src/utils/dto/signinUser.dto';
import { CreateUserDto } from 'src/utils/dto/createUser.dto';
import { iEnvirontVariables } from 'src/config/config.validation';

const v1 = 'v1';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService<iEnvirontVariables>,
  ) {}

  @Post(`sign-in/${v1}`)
  async signIn(@Body() signInDto: SigninUserDto, @Req() req: Request) {
    const { cookie, ...result } = await this.authService.signIn(signInDto);

    setCookie({
      req,
      cookie,
      expireHour: this.configService.get('COOKIE_EXPIRATION_TIME'),
    });

    return result;
  }

  @Post(`sign-up/${v1}`)
  async signUp(@Body() signUpDto: CreateUserDto, @Req() req: Request) {
    const { cookie, ...result } = await this.authService.signUp(signUpDto);

    setCookie({
      req,
      cookie,
      expireHour: this.configService.get('COOKIE_EXPIRATION_TIME'),
    });

    return result;
  }
}
