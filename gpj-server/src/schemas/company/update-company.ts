import { companySchema } from './company';
import { createCompanyBodySchema } from './create-company';

export const updateCompanyParamsSchema = {
  type: 'object',
  properties: {
    companyId: {
      type: 'number',
    },
  },
  required: ['companyId'],
  additionalProperties: false,
} as const;

export const updateCompanyBodySchema = createCompanyBodySchema;

export const updateCompanyReplySchema = companySchema;
