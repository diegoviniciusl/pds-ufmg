import { FastifyPluginAsync, FastifySchema } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import updateCompany from '../../domain/company/update-company';
import { updateCompanyBodySchema, updateCompanyParamsSchema, updateCompanyReplySchema } from '../../schemas/company/update-company';
import { defaultErrorReply } from '../../schemas/default-error-reply';
import Options from '../../types/options';

const opts: { schema: FastifySchema } = {
  schema: {
    params: updateCompanyParamsSchema,
    body: updateCompanyBodySchema,
    response: {
      200: updateCompanyReplySchema,
      400: defaultErrorReply,
    },
  },
};

const updateCompanyRoute: FastifyPluginAsync<Options> = async (
  app,
  { repository },
) => {
  app.put<{
    Params: FromSchema<typeof updateCompanyParamsSchema>
    Body: FromSchema<typeof updateCompanyBodySchema>
    Reply: FromSchema<typeof updateCompanyReplySchema> | FromSchema<typeof defaultErrorReply>
  }>('/:companyId', opts, updateCompany(repository));
};

export default updateCompanyRoute;
