import { extendedTrialSchema, trialSchema } from './trial';

const {
  trialId, status, createdAt, ...bodyProperties
} = trialSchema.properties;

export const createTrialBodySchema = {
  type: 'object',
  properties: bodyProperties,
  required: ['clientId', 'trialRequestedByOffice', 'taskType', 'deadline'],
  additionalProperties: false,
} as const;

export const createTrialReplySchema = extendedTrialSchema;
