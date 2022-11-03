import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUserDto } from '../dto/jwt-user.dto';

export const JwtUser = createParamDecorator(
  (data: any, ctx: ExecutionContext): JwtUserDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
