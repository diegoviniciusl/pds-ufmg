export const deleteTrialParamsSchema = {
  type: 'object',
  properties: {
    trialId: {
      type: 'number',
    },
  },
  required: ['trialId'],
  additionalProperties: false,
} as const;
