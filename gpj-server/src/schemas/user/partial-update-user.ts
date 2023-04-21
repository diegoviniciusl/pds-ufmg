import { createUserReplySchema } from './create-user';
import { userSchema } from './user';

const { userId, ...bodyProperties } = userSchema.properties;

export const partialUpdateUserParamsSchema = {
  type: 'object',
  properties: {
    userId: {
      type: 'number',
    },
  },
  required: ['userId'],
  additionalProperties: false,
} as const;

export const partialUpdateUserBodySchema = {
  type: 'object',
  properties: bodyProperties,
  additionalProperties: false,
} as const;

export const partialUpdateUserReplySchema = createUserReplySchema;
