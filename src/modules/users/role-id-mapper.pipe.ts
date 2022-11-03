import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { UserRoleIdMapping } from '../user-roles/constants/user-roles';

@Injectable()
export class RoleIdMapperPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    value.role_id = UserRoleIdMapping[String(value.role_id).toLowerCase()];

    return value;
  }
}
