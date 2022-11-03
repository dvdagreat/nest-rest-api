import { Injectable } from '@nestjs/common';
import {
  CreateUserAccountDto,
  CreateUserDetailsDto,
} from './dto/create-user.dto';
import { User } from './entities/user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  async create(
    userAccountDto: CreateUserAccountDto,
    userDetailsDto: CreateUserDetailsDto,
  ) {
    return await this.userRepository.create(userAccountDto, userDetailsDto);
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneByUsername(username);
  }

  async isUserRegistered(username: string, email: string) {
    return await this.userRepository.isUserRegistered(username, email);
  }
}
