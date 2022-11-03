import {
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateUserRoleParams } from './decorators/create-user-role-params.decorator';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UserRolesService } from './user-roles.service';

@Controller('user-roles')
export class UserRolesController {
  constructor(private userRoleService: UserRolesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return await this.userRoleService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(
    new ValidationPipe({ transform: true, validateCustomDecorators: true }),
  )
  @Post()
  async create(
    @CreateUserRoleParams()
    userRoleDto: CreateUserRoleDto,
  ) {
    return await this.userRoleService.create(userRoleDto.name);
  }
}
