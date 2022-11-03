import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { UserRoleFieldMapper } from './user-role-external.dto';

export const UserRoleFields = [UserRoleFieldMapper.FIELD_name];

export class CreateUserRoleDto {
  @Expose({ name: 'name' })
  @IsNotEmpty()
  @IsString()
  @Length(4, 16)
  name: string;
}
