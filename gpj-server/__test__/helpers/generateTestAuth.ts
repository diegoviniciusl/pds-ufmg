import { Role, PrismaClient } from '@prisma/client';
import { generateAccessToken } from '../../src/utils/jwt-token-helper';

const generateTestAuth = async (prisma: PrismaClient) => {
  const user = {
    userId: 1,
    name: 'Teste da Silva',
    email: 'email@teste.com',
    role: Role.ADMIN,
    active: true,
    phone: '123456789',
    password: '12345678',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await prisma.user.deleteMany({});

  await prisma.user.create({
    data: user,
  });

  return `Bearer ${generateAccessToken(user)}`;
};

export default generateTestAuth;
