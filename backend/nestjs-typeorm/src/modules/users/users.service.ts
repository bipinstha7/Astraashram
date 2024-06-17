import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './users.entity';
import { iFindUser } from './users.interface';
import { CreateUserDto } from '../../utils/dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findUser({ query, select = ['id'] }: iFindUser): Promise<Partial<User> | null> {
    return this.userRepository.findOne({ where: query, select });
  }

  async createUser(payload: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(payload);
    return this.userRepository.save(newUser);
  }

  async deleteAllUsers() {
    await this.userRepository.clear();
    return 'Done';
  }
}
