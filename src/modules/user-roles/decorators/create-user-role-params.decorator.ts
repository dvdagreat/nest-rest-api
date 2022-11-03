import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { CreateUserRoleDto, UserRoleFields } from '../dto/create-user-role.dto';

export const CreateUserRoleParams = createParamDecorator(
  (data: any, ctx: ExecutionContext): Partial<CreateUserRoleDto> => {
    const request = ctx.switchToHttp().getRequest();

    const userRole = {};
    UserRoleFields.forEach((value: string) => {
      userRole[value] = request.body[value];
    });

    return userRole;
  },
);
