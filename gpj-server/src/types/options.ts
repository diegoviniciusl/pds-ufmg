import { PrismaClient } from '@prisma/client';

interface Options {
  repository: PrismaClient,
}

export default Options;
