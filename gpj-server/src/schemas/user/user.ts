import { Role } from '@prisma/client';

export const userSchema = {
  type: 'object',
  properties: {
    userId: {
      type: 'number',
    },
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    phone: {
      type: 'string',
      minLength: 10,
      maxLength: 11,
      nullable: true,
    },
    password: {
      type: 'string',
      minLength: 8,
    },
    role: {
      type: 'string',
      enum: Object.values(Role),
    },
    active: {
      type: 'boolean',
    },
  },
  required: ['userId', 'name', 'email', 'phone', 'password', 'role', 'active'],
  additionalProperties: false,
} as const;
