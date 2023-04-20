import { FastifyPluginAsync, FastifySchema } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import partialUpdateTrial from '../../domain/trial/partial-update-trial';
import { defaultErrorReply } from '../../schemas/default-error-reply';
import { partialUpdateTrialBodySchema, partialUpdateTrialParamsSchema, partialUpdateTrialReplySchema } from '../../schemas/trial/partial-update-trial';
import Options from '../../types/options';

const opts: { schema: FastifySchema } = {
  schema: {
    params: partialUpdateTrialParamsSchema,
    body: partialUpdateTrialBodySchema,
    response: {
      200: partialUpdateTrialReplySchema,
      400: defaultErrorReply,
    },
  },
};

const partialUpdateTrialRoute: FastifyPluginAsync<Options> = async (
  app,
  { repository },
) => {
  app.patch<{
    Params: FromSchema<typeof partialUpdateTrialParamsSchema>
    Body: FromSchema<typeof partialUpdateTrialBodySchema>
    Reply: FromSchema<typeof partialUpdateTrialReplySchema> | FromSchema<typeof defaultErrorReply>
  }>('/:trialId', opts, partialUpdateTrial(repository));
};

export default partialUpdateTrialRoute;
