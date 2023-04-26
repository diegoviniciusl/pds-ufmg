import { User } from '../../models';

interface UserSession {
  accessToken: string;
  user: User;
}

export default UserSession;
