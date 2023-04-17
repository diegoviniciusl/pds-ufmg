import { Role } from '@prisma/client';

interface AuthPayload {
  user: {
    userId: number,

    email: string,

    name: string,

    phone: string,

    role: Role,
  },

  iat?: number,

  exp?: number,
}

export default AuthPayload;
