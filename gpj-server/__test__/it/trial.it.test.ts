import { PrismaClient, TaskType } from '@prisma/client';
import createApp from '../../src/create-app';
import requestHelper from '../helpers/requestHelper';
import generateTestAuth from '../helpers/generateTestAuth';

let get: any;
let post: any;
let app: any;
let token: any;
let prisma: any;

describe('[IT] trial', () => {
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
    await prisma.trialHistory.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.trial.deleteMany({});
    await prisma.company.deleteMany({});
    await prisma.$disconnect();
  });

  describe('GET /v1/trial', () => {
    it('should return an empty list', async () => {
      const res = await get({ path: '/v1/trial', auth: token });
      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual([]);
    });
  });

  describe('POST /v1/trial', () => {
    it('should create a new trial', async () => {
      const company = {
        name: 'Teste LTDA',
        taxNumber: '12345678900',
      };
      await prisma.company.create({ data: company });
      const client = await prisma.company.findUnique({
        where: {
          taxNumber: company.taxNumber,
        },
      });

      const trial = {
        clientId: client.companyId,
        trialRequestedByOffice: false,
        taskType: TaskType.FINANCIAL_ANALYSIS,
        deadline: new Date().toISOString().split('T')[0],
      };
      const res = await post({ path: '/v1/trial', params: trial, auth: token });
      expect(res.status).toBe(201);
    });
  });
});
