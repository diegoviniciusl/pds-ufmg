import {
  TaskType, TrialSide, TrialStatus,
} from '@prisma/client';
import Region from '../../types/enums/region';
import TrialType from '../../types/enums/trial-type';
import { companySchema } from '../company/company';
import { createUserReplySchema } from '../user/create-user';
import { trialHistorySchema } from './trial-history';

export const trialSchema = {
  type: 'object',
  properties: {
    trialId: {
      type: 'number',
    },
    clientId: {
      type: 'number',
    },
    officeId: {
      type: 'number',
      nullable: true,
    },
    status: {
      type: 'string',
      enum: Object.values(TrialStatus),
    },
    trialRequestedByOffice: {
      type: 'boolean',
    },
    lawyer: {
      type: 'string',
      nullable: true,
    },
    email: {
      type: 'string',
      format: 'email',
      nullable: true,
    },
    taskType: {
      type: 'string',
      enum: Object.values(TaskType),
    },
    trialNumber: {
      type: 'string',
      minLength: 20,
      maxLength: 20,
      nullable: true,
    },
    deadline: {
      type: 'string',
      format: 'date',
    },
    side: {
      type: 'string',
      enum: [null, ...Object.values(TrialSide)],
      nullable: true,
    },
    plaintiff: {
      type: 'string',
      nullable: true,
    },
    defendant: {
      type: 'string',
      nullable: true,
    },
    privateAnnotations: {
      type: 'string',
      nullable: true,
    },
    publicAnnotations: {
      type: 'string',
      nullable: true,
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['trialId', 'clientId', 'officeId', 'status', 'trialRequestedByOffice', 'lawyer', 'email', 'taskType',
    'trialNumber', 'deadline', 'side', 'plaintiff', 'defendant', 'privateAnnotations', 'publicAnnotations', 'createdAt'],
  additionalProperties: false,
} as const;

export const extendedTrialSchema = {
  type: 'object',
  properties: {
    ...trialSchema.properties,
    user: createUserReplySchema,
    client: companySchema,
    office: {
      ...companySchema,
      nullable: true,
    },
    trialHistories: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          ...trialHistorySchema.properties,
          user: createUserReplySchema,
        },
        required: [...trialHistorySchema.required, 'user'],
      },
    },
    region: {
      type: 'string',
      enum: [null, ...Object.values(Region)],
      nullable: true,
    },
    trialType: {
      type: 'string',
      enum: [null, ...Object.values(TrialType)],
      nullable: true,
    },
  },
  required: [...trialSchema.required, 'user', 'client', 'office', 'trialHistories', 'region', 'trialType'],
  additionalProperties: false,
} as const;
