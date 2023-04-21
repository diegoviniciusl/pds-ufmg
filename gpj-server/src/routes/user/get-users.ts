import { FastifyPluginAsync, FastifySchema } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import getUsers from '../../domain/user/get-users';
import { defaultErrorReply } from '../../schemas/default-error-reply';
import { getUsersReplySchema } from '../../schemas/user/get-users';
import Options from '../../types/options';

const opts: { schema: FastifySchema } = {
  schema: {
    response: {
      200: getUsersReplySchema,
      400: defaultErrorReply,
    },
  },
};

const getUsersRoute: FastifyPluginAsync<Options> = async (
  app,
  { repository },
) => {
  app.get<{
    Reply: FromSchema<typeof getUsersReplySchema> | FromSchema<typeof defaultErrorReply>
  }>('/', opts, getUsers(repository));
};

export default getUsersRoute;
