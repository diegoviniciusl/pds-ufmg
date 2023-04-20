import { TrialStatus } from '@prisma/client';

export const trialHistorySchema = {
  type: 'object',
  properties: {
    trialHistoryId: {
      type: 'number',
    },
    trialId: {
      type: 'number',
    },
    userId: {
      type: 'number',
    },
    status: {
      type: 'string',
      enum: Object.values(TrialStatus),
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['trialHistoryId', 'trialId', 'userId', 'status', 'createdAt'],
  additionalProperties: false,
} as const;
