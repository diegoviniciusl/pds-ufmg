import { FastifyPluginAsync, FastifySchema } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import { Prisma } from '@prisma/client';
import { Parser } from 'json2csv';
import { defaultErrorReply } from '../../schemas/default-error-reply';
import Options from '../../types/options';
import TrialOrderableColumn from '../../types/enums/trial-orderable-column';
import { includeForExtendedTrialQuery, parseExtendedTrial } from '../../utils/trial/extended-trial-helper';
import { getTrialsCsvReplySchema } from '../../schemas/trial/get-trials-csv';
import { formatDate, formatDateTime } from '../../utils/date-helper';
import getTrialSideLabel from '../../utils/translation/get-trial-side-label';
import getTaskTypeLabel from '../../utils/translation/get-task-type-label';
import getTrialStatusLabel from '../../utils/translation/get-trial-status-label';
import formatTrialNumber from '../../utils/trial/format-trial-number';
import getTrialsCsv from '../../domain/trial/get-trials-csv';

const opts: { schema: FastifySchema } = {
  schema: {
    response: {
      200: getTrialsCsvReplySchema,
      400: defaultErrorReply,
    },
  },
};

const getTrialsCsvRoute: FastifyPluginAsync<Options> = async (
  app,
  { repository },
) => {
  app.get<{
    Reply: FromSchema<typeof getTrialsCsvReplySchema> | FromSchema<typeof defaultErrorReply>
  }>('/csv', opts, getTrialsCsv(repository));
};

export default getTrialsCsvRoute;
