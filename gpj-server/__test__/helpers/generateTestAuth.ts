import { Role, PrismaClient } from '@prisma/client';
import { generateAccessToken } from '../../src/utils/jwt-token-helper';

const generateTestAuth = async (prisma: PrismaClient) => {
  const user = {
    name: 'Teste da Silva',
    email: 'auth@teste.com',
    role: Role.ADMIN,
    active: true,
    phone: '123456789',
    password: '12345678',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const newUser = await prisma.user.create({
    data: user,
  });

  return `Bearer ${generateAccessToken({ ...user, userId: newUser.userId })}`;
};

export default generateTestAuth;
