import { Role } from '../../enums';

const getUserRoleText = (role: Role): string => {
  if (role === Role.ADMIN) return 'Administrador';

  return 'Funcionário';
};

export default getUserRoleText;
