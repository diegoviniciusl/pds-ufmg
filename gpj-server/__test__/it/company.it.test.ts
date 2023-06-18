import { PrismaClient } from '@prisma/client';
import createApp from '../../src/create-app';
import requestHelper from '../helpers/requestHelper';
import generateTestAuth from '../helpers/generateTestAuth';

let get: any;
let post: any;
let app: any;
let token: any;
let prisma: any;

describe('[IT] company', () => {
  beforeAll(async () => {
    app = await createApp();
    const helper = await requestHelper(app);
    get = helper.get;
    post = helper.post;
    process.env.JWT_SECRET = '12345678';
    prisma = new PrismaClient();
    token = await generateTestAuth(prisma);
  });

  afterAll(async () => {
    await app.close();
    await prisma.user.deleteMany({});
    await prisma.company.deleteMany({});
    await prisma.$disconnect();
  });

  describe('GET /v1/company', () => {
    it('should return an empty list', async () => {
      const res = await get({ path: '/v1/company', auth: token });
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual([]);
    });
  });

  describe('POST /v1/company', () => {
    it('should create a new company', async () => {
      const company = {
        name: 'Teste LTDA',
        companyId: '123456789',
        phone: '1234567890',
        taxNumber: '12345678900',
        email: 'email@testeltda.com',
        password: '12345678',
      };
      const res = await post({ path: '/v1/company', params: company, auth: token });
      expect(res.status).toBe(201);
    });
  });
});
