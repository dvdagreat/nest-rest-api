import {
  Post,
  Controller,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { Request as Req } from 'express';
import { UserAccountDto } from '../users/decorators/user-account.decorator';
import { UserDetailstDto } from '../users/decorators/user-details.decorator';
import {
  CreateUserAccountDto,
  CreateUserDetailsDto,
} from '../users/dto/create-user.dto';
import { RoleIdMapperPipe } from '../users/role-id-mapper.pipe';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: Req) {
    return this.authService.login(req.user);
  }

  @UsePipes(
    new ValidationPipe({ transform: true, validateCustomDecorators: true }),
  )
  @HttpCode(201)
  @Post('register')
  register(
    @UserAccountDto(new ValidationPipe({ transform: true }), RoleIdMapperPipe)
    userAccount: CreateUserAccountDto,
    @UserDetailstDto(new ValidationPipe({ transform: true }))
    userDetails: CreateUserDetailsDto,
  ) {
    console.log(`from controller`, userAccount);
    return this.authService.register(userAccount, userDetails);
  }
}
