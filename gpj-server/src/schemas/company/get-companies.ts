import { companySchema } from './company';

export const getCompaniesReplySchema = {
  type: 'array',
  items: companySchema,
} as const;
