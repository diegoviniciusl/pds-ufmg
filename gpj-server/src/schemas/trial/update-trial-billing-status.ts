export const updateTrialBillingStatusQuerySchema = {
  type: 'object',
  properties: {
    trialIds: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
  },
  required: ['trialIds'],
} as const;

export const updateTrialBillingStatusBodySchema = {
  type: 'object',
  properties: {
    billingStatus: {
      type: 'string',
      enum: [BillingStatus.UNBILLED, BillingStatus.NON_BILLABLE],
    },
  },
  required: ['billingStatus'],
  additionalProperties: false,
} as const;

export const updateTrialBillingStatusReplySchema = {} as const;
