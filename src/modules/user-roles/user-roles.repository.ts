import { Injectable } from '@nestjs/common';
import { UserRole } from './entities/user-role.model';

@Injectable()
export class UserRoleRepository {
  getAll = async (): Promise<UserRole[]> => {
    return await UserRole.findAll({ raw: true });
  };

  create = async (name: string): Promise<UserRole> => {
    return (await UserRole.create({ name })).save();
  };
}
