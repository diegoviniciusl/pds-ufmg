import { FastifyPluginAsync, FastifySchema } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import deleteTrial from '../../domain/trial/delete-trial';
import { defaultErrorReply } from '../../schemas/default-error-reply';
import { deleteTrialParamsSchema } from '../../schemas/trial/delete-trial';
import Options from '../../types/options';

const opts: { schema: FastifySchema } = {
  schema: {
    params: deleteTrialParamsSchema,
    response: {
      204: {},
      400: defaultErrorReply,
    },
  },
};

const deleteTrialRoute: FastifyPluginAsync<Options> = async (
  app,
  { repository },
) => {
  app.delete<{
    Params: FromSchema<typeof deleteTrialParamsSchema>
    Reply: {} | FromSchema<typeof defaultErrorReply>
  }>('/:trialId', opts, deleteTrial(repository));
};

export default deleteTrialRoute;
