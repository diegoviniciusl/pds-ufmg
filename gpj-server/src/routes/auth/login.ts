import { FastifyPluginAsync, FastifySchema } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import { defaultErrorReply } from '../../schemas/default-error-reply';
import { loginBodySchema, loginReplySchema } from '../../schemas/auth/login';
import Options from '../../types/options';
import login from '../../domain/auth/login';

const opts: { schema: FastifySchema } = {
  schema: {
    body: loginBodySchema,
    response: {
      200: loginReplySchema,
      400: defaultErrorReply,
      404: {} as const,
    },
  },
};

const loginRoute: FastifyPluginAsync<Options> = async (
  app,
  { repository },
) => {
  app.post<{
    Body: FromSchema<typeof loginBodySchema>
    Reply: FromSchema<typeof loginReplySchema> | FromSchema<typeof defaultErrorReply>
  }>('/login', opts, login(repository));
};

export default loginRoute;
