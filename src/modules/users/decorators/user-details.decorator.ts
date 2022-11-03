import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {
  CreateUserDetailsDto,
  UserDetailsFields,
} from '../dto/create-user.dto';

export const UserDetailstDto = createParamDecorator(
  (data: any, ctx: ExecutionContext): Partial<CreateUserDetailsDto> => {
    const request = ctx.switchToHttp().getRequest();

    const userDetails = {};
    UserDetailsFields.forEach(
      (value: string) => (userDetails[value] = request.body[value]),
    );

    return userDetails;
  },
);
