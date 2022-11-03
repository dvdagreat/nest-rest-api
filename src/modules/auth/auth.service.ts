import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  CreateUserAccountDto,
  CreateUserDetailsDto,
} from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(
    userAccount: CreateUserAccountDto,
    userDetails: CreateUserDetailsDto,
  ) {
    const isRegistered = await this.userService.isUserRegistered(
      userAccount.username,
      userAccount.email,
    );

    if (isRegistered) {
      throw new ForbiddenException({ message: 'user already exists' });
    }

    if (!(await this.userService.create(userAccount, userDetails))) {
      throw new InternalServerErrorException({
        mesaage: 'cannot create new user',
      });
    }
  }
}
