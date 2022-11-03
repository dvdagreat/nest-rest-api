import { Expose } from 'class-transformer';
import {
  Matches,
  Length,
  IsString,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';
import { UserRoleList } from 'src/modules/user-roles/constants/user-roles';
import { UserFieldMapper } from './user-external.dto';

// User fields expected in the create User request (user account fields)
export const UserAccountFields = [
  UserFieldMapper.FIELD_username,
  UserFieldMapper.FIELD_email,
  UserFieldMapper.FIELD_password,
  UserFieldMapper.FIELD_role,
];

export class CreateUserAccountDto {
  @Expose({ name: UserFieldMapper.FIELD_username })
  @IsNotEmpty()
  @IsString()
  @Length(6, 18)
  username: string;

  @Expose({ name: UserFieldMapper.FIELD_email })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @Expose({ name: UserFieldMapper.FIELD_password })
  @IsNotEmpty()
  @IsString()
  @Length(6, 18)
  password: string;

  @Expose({ name: UserFieldMapper.FIELD_role })
  @IsNotEmpty()
  @Matches(new RegExp(`${UserRoleList.join('|')}`, 'i'))
  role_id: number;
}

// User fields expected in the create User request (user details fields)
export const UserDetailsFields = [
  UserFieldMapper.FIELD_firstName,
  UserFieldMapper.FIELD_lastName,
];

export class CreateUserDetailsDto {
  @Expose({ name: UserFieldMapper.FIELD_firstName })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  @Matches('\\w+')
  first_name: string;

  @Expose({ name: UserFieldMapper.FIELD_lastName })
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  @Matches('\\w+')
  last_name: string;
}
