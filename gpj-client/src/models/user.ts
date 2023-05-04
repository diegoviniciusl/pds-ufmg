import { Role } from '../shared/enums';

interface User {
  userId: number;
  name: string;
  role: Role;
  email: string;
  phone: string | null;
  active: boolean;
}

export default User;
