import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { IS_PUBLIC_KEY } from 'src/utils/constants';
import { UsersService } from '../users/users.service';
import { iEnvirontVariables } from 'src/config/config.validation';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userService: UsersService,
    private configService: ConfigService<iEnvirontVariables>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET_KEY'),
      });

      const user = this.userService.findUser({ query: { _id: payload._id } });

      if (!user) throw new UnauthorizedException();

      response['astraUser'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request): string | undefined {
    console.dir({ req: request.cookies }, { depth: null });
    // const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    const [type, token] = request.cookies?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
