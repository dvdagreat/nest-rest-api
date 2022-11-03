import { Injectable } from '@nestjs/common';
import { UserRole } from './entities/user-role.model';
import { UserRoleRepository } from './user-roles.repository';

@Injectable()
export class UserRolesService {
  constructor(private userRoleRepository: UserRoleRepository) {}

  getAll = async (): Promise<UserRole[]> => {
    return await this.userRoleRepository.getAll();
  };

  create = async (name: string): Promise<UserRole> => {
    return await this.userRoleRepository.create(name);
  };
}
