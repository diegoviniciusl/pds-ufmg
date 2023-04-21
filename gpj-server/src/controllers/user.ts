import { Role } from '@prisma/client';
import { FastifyPluginAsync } from 'fastify';
import createUserRoute from '../routes/user/create-user';
import getUsersRoute from '../routes/user/get-users';
import partialUpdateUserRoute from '../routes/user/partial-update-user';
import Options from '../types/options';
import authorizer from '../utils/authorizer';

const userController: FastifyPluginAsync<Options> = async (
  app,
  options,
) => {
  const prefix = '/v1/user';
  app.addHook('onRequest', authorizer([Role.ADMIN], options));
  app.register(createUserRoute, { ...options, prefix });
  app.register(partialUpdateUserRoute, { ...options, prefix });
  app.register(getUsersRoute, { ...options, prefix });
};

export default userController;
