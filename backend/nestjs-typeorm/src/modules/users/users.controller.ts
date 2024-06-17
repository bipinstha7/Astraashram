import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { UsersService } from './users.service';

const v1 = 'v1';

@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(`deleteall/${v1}`)
  async deleteAllUsers() {
    return this.userService.deleteAllUsers();
  }
}
