import { FastifyPluginAsync, FastifySchema } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import partialUpdateUser from '../../domain/user/partial-update-user';
import { defaultErrorReply } from '../../schemas/default-error-reply';
import { partialUpdateUserParamsSchema, partialUpdateUserBodySchema, partialUpdateUserReplySchema } from '../../schemas/user/partial-update-user';
import Options from '../../types/options';

const opts: { schema: FastifySchema } = {
  schema: {
    params: partialUpdateUserParamsSchema,
    body: partialUpdateUserBodySchema,
    response: {
      200: partialUpdateUserReplySchema,
      400: defaultErrorReply,
    },
  },
};

const partialUpdateUserRoute: FastifyPluginAsync<Options> = async (
  app,
  { repository },
) => {
  app.patch<{
    Params: FromSchema<typeof partialUpdateUserParamsSchema>
    Body: FromSchema<typeof partialUpdateUserBodySchema>
    Reply: FromSchema<typeof partialUpdateUserReplySchema> | FromSchema<typeof defaultErrorReply>
  }>('/:userId', opts, partialUpdateUser(repository));
};

export default partialUpdateUserRoute;
