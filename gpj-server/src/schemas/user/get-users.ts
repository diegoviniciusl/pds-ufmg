import { createUserReplySchema } from './create-user';

export const getUsersReplySchema = {
  type: 'array',
  items: createUserReplySchema,
} as const;
