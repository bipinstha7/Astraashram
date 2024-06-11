import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from './users.schema';
import { CreateUserDto } from '../../utils/dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUser({
    query,
    select = '_id',
  }: {
    query: any;
    select?: string;
  }): Promise<Partial<UserDocument>> {
    return this.userModel.findOne(query).lean().select(select);
  }

  async createUser(payload: CreateUserDto): Promise<UserDocument> {
    return this.userModel.create(payload);
  }

  async deleteAllUsers() {
    await this.userModel.deleteMany();
    return 'Done';
  }
}
