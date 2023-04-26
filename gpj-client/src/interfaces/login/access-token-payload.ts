import { User } from '../../models';

interface AccessTokenPayload {
  user: User;
  iat: number;
  exp: number;
}

export default AccessTokenPayload;
