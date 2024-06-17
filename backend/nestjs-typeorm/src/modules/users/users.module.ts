import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],

  /**
   * add the UsersService to the exports array of the @Module decorator so that it is visible outside
   * this module (we use it in our AuthService)
   */
  exports: [UsersService],
})
export class UsersModule {}
