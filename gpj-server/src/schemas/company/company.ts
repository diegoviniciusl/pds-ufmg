export const companySchema = {
  type: 'object',
  properties: {
    companyId: {
      type: 'number',
    },
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
      nullable: true,
    },
    phone: {
      type: 'string',
      minLength: 10,
      maxLength: 11,
      nullable: true,
    },
    taxNumber: {
      oneOf: [{
        type: 'string',
        minLength: 11,
        maxLength: 11,
      }, {
        type: 'string',
        minLength: 14,
        maxLength: 14,
      }, {
        type: 'null',
        nullable: true,
      }],
    },
    notes: {
      type: 'string',
      nullable: true,
    },
    receiptDescription: {
      type: 'string',
      nullable: true,
    },
  },
  required: ['companyId', 'name', 'email', 'phone', 'taxNumber', 'notes', 'receiptDescription'],
  additionalProperties: false,
} as const;
