import { companySchema } from './company';

const { companyId, ...bodyProperties } = companySchema.properties;

export const createCompanyBodySchema = {
  type: 'object',
  properties: bodyProperties,
  required: ['name'],
  additionalProperties: false,
} as const;

export const createCompanyReplySchema = companySchema;
