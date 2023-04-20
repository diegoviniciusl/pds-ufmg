import { extendedTrialSchema, trialSchema } from './trial';

const {
  trialId, createdAt, ...bodyProperties
} = trialSchema.properties;

export const partialUpdateTrialParamsSchema = {
  type: 'object',
  properties: {
    trialId: {
      type: 'number',
    },
  },
  required: ['trialId'],
  additionalProperties: false,
} as const;

export const partialUpdateTrialBodySchema = {
  type: 'object',
  properties: bodyProperties,
  additionalProperties: false,
} as const;

export const partialUpdateTrialReplySchema = extendedTrialSchema;
