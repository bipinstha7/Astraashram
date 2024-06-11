import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { User, UserSchema } from './users.schema';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  controllers: [UsersController],

  /**
   * add the UsersService to the exports array of the @Module decorator so that it is visible outside
   * this module (we use it in our AuthService)
   */
  exports: [UsersService],
})
export class UsersModule {}
