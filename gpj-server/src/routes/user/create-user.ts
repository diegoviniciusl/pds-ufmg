import { FastifyPluginAsync, FastifySchema } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import createUser from '../../domain/user/create-user';
import { defaultErrorReply } from '../../schemas/default-error-reply';
import { createUserBodySchema, createUserReplySchema } from '../../schemas/user/create-user';
import Options from '../../types/options';

const opts: { schema: FastifySchema } = {
  schema: {
    body: createUserBodySchema,
    response: {
      201: createUserReplySchema,
      400: defaultErrorReply,
    },
  },
};

const createUserRoute: FastifyPluginAsync<Options> = async (
  app,
  { repository },
) => {
  app.post<{
    Body: FromSchema<typeof createUserBodySchema>
    Reply: FromSchema<typeof createUserReplySchema> | FromSchema<typeof defaultErrorReply>
  }>('/', opts, createUser(repository));
};

export default createUserRoute;
