import {
  Prisma, TaskType, TrialStatus,
} from '@prisma/client';
import TrialOrderableColumn from '../../types/enums/trial-orderable-column';
import { extendedTrialSchema } from './trial';

export const getTrialsQuerySchema = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      enum: Object.values(TrialStatus),
    },
    taskType: {
      type: 'string',
      enum: Object.values(TaskType),
    },
    clientId: {
      type: 'number',
    },
    officeId: {
      type: 'number',
    },
    fromCreatedAt: {
      type: 'string',
      format: 'date',
    },
    toCreatedAt: {
      type: 'string',
      format: 'date',
    },
    fromDeadline: {
      type: 'string',
      format: 'date',
    },
    toDeadline: {
      type: 'string',
      format: 'date',
    },
    pastDue: {
      type: 'string',
      enum: ['true', 'false'],
    },
    search: {
      type: 'string',
    },
    orderByColumn: {
      type: 'string',
      enum: Object.values(TrialOrderableColumn),
    },
    orderByDirection: {
      type: 'string',
      enum: Object.values(Prisma.SortOrder),
    },
  },
  additionalProperties: false,
} as const;

export const getTrialsReplySchema = {
  type: 'array',
  items: extendedTrialSchema,
} as const;
