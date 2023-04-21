import { userSchema } from './user';

const { userId, active, ...bodyProperties } = userSchema.properties;

const { password, ...replyProperties } = userSchema.properties;

export const createUserBodySchema = {
  type: 'object',
  properties: bodyProperties,
  required: ['name', 'email', 'password', 'role'],
  additionalProperties: false,
} as const;

export const createUserReplySchema = {
  type: 'object',
  properties: replyProperties,
  required: ['userId', 'name', 'email', 'phone', 'role', 'active'],
  additionalProperties: false,
} as const;
