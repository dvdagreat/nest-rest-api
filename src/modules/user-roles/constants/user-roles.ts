export class UserRole {
  static Role_user = 'user';
  static Role_admin = 'admin';
}

export const UserRoleList = [UserRole.Role_admin, UserRole.Role_user];

export const UserRoleIdMapping = {
  [UserRole.Role_user]: 2,
  [UserRole.Role_admin]: 3,
};
