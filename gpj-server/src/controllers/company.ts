import { Role } from '@prisma/client';
import { FastifyPluginAsync } from 'fastify';
import createCompanyRoute from '../routes/company/create-company';
import getCompaniesRoute from '../routes/company/get-companies';
import updateCompanyRoute from '../routes/company/update-company';
import Options from '../types/options';
import authorizer from '../utils/authorizer';

const companyController: FastifyPluginAsync<Options> = async (
  app,
  options,
) => {
  const prefix = '/v1/company';
  app.addHook('onRequest', authorizer([Role.ADMIN, Role.USER], options));
  app.register(createCompanyRoute, { ...options, prefix });
  app.register(updateCompanyRoute, { ...options, prefix });
  app.register(getCompaniesRoute, { ...options, prefix });
};

export default companyController;
