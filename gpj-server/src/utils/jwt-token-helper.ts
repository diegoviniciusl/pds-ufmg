import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export const generateAccessToken = (user: User): string => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error('Missing JWT_SECRET env variable');
  }
  const payload = {
    user: {
      userId: user.userId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      active: user.active,
    },
  };
  return jwt.sign(
    {
      ...payload,
    },
    secretKey,
    {
      expiresIn: '30d',
    },
  );
};
