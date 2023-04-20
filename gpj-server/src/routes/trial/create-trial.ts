import { FastifyPluginAsync, FastifySchema } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import createTrial from '../../domain/trial/create-trial';
import { defaultErrorReply } from '../../schemas/default-error-reply';
import { createTrialBodySchema, createTrialReplySchema } from '../../schemas/trial/create-trial';
import Options from '../../types/options';

const opts: { schema: FastifySchema } = {
  schema: {
    body: createTrialBodySchema,
    response: {
      201: createTrialReplySchema,
      400: defaultErrorReply,
    },
  },
};

const createTrialRoute: FastifyPluginAsync<Options> = async (
  app,
  { repository },
) => {
  app.post<{
    Body: FromSchema<typeof createTrialBodySchema>
    Reply: FromSchema<typeof createTrialReplySchema> | FromSchema<typeof defaultErrorReply>
  }>('/', opts, createTrial(repository));
};

export default createTrialRoute;
