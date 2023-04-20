import { FastifyPluginAsync, FastifySchema } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import getTrials from '../../domain/trial/get-trials';
import { defaultErrorReply } from '../../schemas/default-error-reply';
import { getTrialsQuerySchema, getTrialsReplySchema } from '../../schemas/trial/get-trials';
import Options from '../../types/options';

const opts: { schema: FastifySchema } = {
  schema: {
    querystring: getTrialsQuerySchema,
    response: {
      200: getTrialsReplySchema,
      400: defaultErrorReply,
    },
  },
};

const getTrialsRoute: FastifyPluginAsync<Options> = async (
  app,
  { repository },
) => {
  app.get<{
    Querystring: FromSchema<typeof getTrialsQuerySchema>
    Reply: FromSchema<typeof getTrialsReplySchema> | FromSchema<typeof defaultErrorReply>
  }>('/', opts, getTrials(repository));
};

export default getTrialsRoute;
