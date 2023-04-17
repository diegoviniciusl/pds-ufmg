import { FastifyPluginAsync } from 'fastify';
import loginRoute from '../routes/auth/login';
import Options from '../types/options';

const authController: FastifyPluginAsync<Options> = async (
  app,
  options,
) => {
  const prefix = '/v1/auth';
  app.register(loginRoute, { ...options, prefix });
};

export default authController;
