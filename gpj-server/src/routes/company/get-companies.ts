import { FastifyPluginAsync, FastifySchema } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import { defaultErrorReply } from '../../schemas/default-error-reply';
import { getCompaniesReplySchema } from '../../schemas/company/get-companies';
import Options from '../../types/options';
import getCompanies from '../../domain/company/get-companies';

const opts: { schema: FastifySchema } = {
  schema: {
    response: {
      200: getCompaniesReplySchema,
      400: defaultErrorReply,
    },
  },
};

const getCompaniesRoute: FastifyPluginAsync<Options> = async (
  app,
  { repository },
) => {
  app.get<{
    Reply: FromSchema<typeof getCompaniesReplySchema> | FromSchema<typeof defaultErrorReply>
  }>('/', opts, getCompanies(repository));
};

export default getCompaniesRoute;
