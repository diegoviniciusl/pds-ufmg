import { FastifyPluginAsync, FastifySchema } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import createCompany from '../../domain/company/create-company';
import { createCompanyBodySchema, createCompanyReplySchema } from '../../schemas/company/create-company';
import { defaultErrorReply } from '../../schemas/default-error-reply';
import Options from '../../types/options';

const opts: { schema: FastifySchema } = {
  schema: {
    body: createCompanyBodySchema,
    response: {
      201: createCompanyReplySchema,
      400: defaultErrorReply,
    },
  },
};

const createCompanyRoute: FastifyPluginAsync<Options> = async (
  app,
  { repository },
) => {
  app.post<{
    Body: FromSchema<typeof createCompanyBodySchema>
    Reply: FromSchema<typeof createCompanyReplySchema> | FromSchema<typeof defaultErrorReply>
  }>('/', opts, createCompany(repository));
};

export default createCompanyRoute;
