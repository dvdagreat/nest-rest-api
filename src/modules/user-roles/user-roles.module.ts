import { Module } from '@nestjs/common';
import { UserRolesController } from './user-roles.controller';
import { UserRoleRepository } from './user-roles.repository';
import { UserRolesService } from './user-roles.service';

@Module({
  controllers: [UserRolesController],
  providers: [UserRolesService, UserRoleRepository],
})
export class UserRolesModule {}
