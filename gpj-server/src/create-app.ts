import 'dotenv/config';
import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Options from './types/options';
import authController from './controllers/auth';
import userController from './controllers/user';
import AuthPayload from './types/auth-payload';
import companyController from './controllers/company';
import trialController from './controllers/trial';
import Repository from './types/respository';

declare module 'fastify' {
  interface FastifyRequest {
    session: AuthPayload
  }
}

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/Sao_Paulo');

export default async function createApp() {
  const opts: Options = {
    repository: new Repository(),
  };

  const app = fastify({
    ajv: {
      customOptions: {
        allErrors: true,
        coerceTypes: 'array',
      },
    },
    logger: true,
    ...opts,
  });

  app.register(fastifyCors, {
    origin: '*',
    exposedHeaders: [
      'found-duplicated-trial',
      'authorization',
    ],
  });
  app.get('/startup', async () => 'OK');
  app.register(authController, opts);
  app.register(userController, opts);
  app.register(companyController, opts);
  app.register(trialController, opts);

  return app;
}
