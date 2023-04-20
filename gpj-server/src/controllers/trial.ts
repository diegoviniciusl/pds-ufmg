import { Role } from '@prisma/client';
import { FastifyPluginAsync } from 'fastify';
import createTrialRoute from '../routes/trial/create-trial';
import deleteTrialRoute from '../routes/trial/delete-trial';
import getTrialsRoute from '../routes/trial/get-trials';
import getTrialsCsvRoute from '../routes/trial/get-trials-csv';
import partialUpdateTrialRoute from '../routes/trial/partial-update-trial';
import Options from '../types/options';
import authorizer from '../utils/authorizer';

const trialController: FastifyPluginAsync<Options> = async (
  app,
  options,
) => {
  const prefix = '/v1/trial';
  app.addHook('onRequest', authorizer([Role.ADMIN, Role.USER], options));
  app.register(createTrialRoute, { ...options, prefix });
  app.register(getTrialsRoute, { ...options, prefix });
  app.register(partialUpdateTrialRoute, { ...options, prefix });
  app.register(deleteTrialRoute, { ...options, prefix });
  app.register(getTrialsCsvRoute, { ...options, prefix });
};

export default trialController;
