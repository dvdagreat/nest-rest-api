import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {
  CreateUserAccountDto,
  UserAccountFields,
} from '../dto/create-user.dto';

export const UserAccountDto = createParamDecorator(
  (data: any, ctx: ExecutionContext): Partial<CreateUserAccountDto> => {
    const request = ctx.switchToHttp().getRequest();

    const userAccount = {};
    UserAccountFields.forEach(
      (value: string) => (userAccount[value] = request.body[value]),
    );

    return userAccount;
  },
);
