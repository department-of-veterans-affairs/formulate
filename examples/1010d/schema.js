const schema = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: '10-10D CHAMPVA',
  type: 'object',
  additionalProperties: true,
  definitions: {
    formNumber: {
      type: 'string',
    },
    centralMailAddress: {
      type: 'object',
      oneOf: [
        {
          properties: {
            country: {
              type: 'string',
              enum: ['CAN'],
            },
            state: {
              type: 'string',
              enum: [
                'AB',
                'BC',
                'MB',
                'NB',
                'NF',
                'NT',
                'NV',
                'NU',
                'ON',
                'PE',
                'QC',
                'SK',
                'YT',
              ],
            },
            postalCode: {
              type: 'string',
              maxLength: 10,
            },
          },
        },
        {
          properties: {
            country: {
              type: 'string',
              enum: ['MEX'],
            },
            state: {
              type: 'string',
              enum: [
                'aguascalientes',
                'baja-california-norte',
                'baja-california-sur',
                'campeche',
                'chiapas',
                'chihuahua',
                'coahuila',
                'colima',
                'distrito-federal',
                'durango',
                'guanajuato',
                'guerrero',
                'hidalgo',
                'jalisco',
                'mexico',
                'michoacan',
                'morelos',
                'nayarit',
                'nuevo-leon',
                'oaxaca',
                'puebla',
                'queretaro',
                'quintana-roo',
                'san-luis-potosi',
                'sinaloa',
                'sonora',
                'tabasco',
                'tamaulipas',
                'tlaxcala',
                'veracruz',
                'yucatan',
                'zacatecas',
              ],
            },
            postalCode: {
              type: 'string',
              maxLength: 10,
            },
          },
        },
        {
          properties: {
            country: {
              type: 'string',
              enum: ['USA'],
            },
            state: {
              type: 'string',
              enum: [
                'AL',
                'AK',
                'AS',
                'AZ',
                'AR',
                'AA',
                'AE',
                'AP',
                'CA',
                'CO',
                'CT',
                'DE',
                'DC',
                'FM',
                'FL',
                'GA',
                'GU',
                'HI',
                'ID',
                'IL',
                'IN',
                'IA',
                'KS',
                'KY',
                'LA',
                'ME',
                'MH',
                'MD',
                'MA',
                'MI',
                'MN',
                'MS',
                'MO',
                'MT',
                'NE',
                'NV',
                'NH',
                'NJ',
                'NM',
                'NY',
                'NC',
                'ND',
                'MP',
                'OH',
                'OK',
                'OR',
                'PW',
                'PA',
                'PR',
                'RI',
                'SC',
                'SD',
                'TN',
                'TX',
                'UT',
                'VT',
                'VI',
                'VA',
                'WA',
                'WV',
                'WI',
                'WY',
              ],
            },
            postalCode: {
              type: 'string',
              pattern: '^(\\d{5})(?:[-](\\d{4}))?$',
            },
          },
        },
        {
          properties: {
            country: {
              not: {
                type: 'string',
                enum: ['CAN', 'MEX', 'USA'],
              },
            },
            state: {
              type: 'string',
              maxLength: 51,
            },
            postalCode: {
              type: 'string',
              maxLength: 51,
            },
          },
        },
      ],
      properties: {
        street: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        street2: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        city: {
          type: 'string',
          minLength: 1,
          maxLength: 51,
        },
      },
      required: ['postalCode'],
    },
    usaPhone: {
      type: 'string',
      pattern: '^\\d{10}$',
    },
    vaFileNumber: {
      type: 'string',
    },
    deceased: {
      type: 'boolean',
      enum: [false],
    },
    deathDuringService: {
      type: 'boolean',
      enum: [false],
    },
    dateRange: {
      type: 'object',
      properties: {
        from: {
          $ref: '#/definitions/date',
        },
        to: {
          $ref: '#/definitions/date',
        },
      },
    },
    privacyAgreementAccepted: {
      type: 'boolean',
      enum: [true],
    },
    fullName: {
      type: 'object',
      properties: {
        first: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        middle: {
          type: 'string',
        },
        last: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        suffix: {
          type: 'string',
          enum: ['Jr.', 'Sr.', 'II', 'III', 'IV'],
        },
      },
      required: ['first', 'last'],
    },
    ssn: {
      type: 'string',
      pattern: '^[0-9]{9}$',
    },
    date: {
      pattern:
        '^(\\d{4}|XXXX)-(0[1-9]|1[0-2]|XX)-(0[1-9]|[1-2][0-9]|3[0-1]|XX)$',
      type: 'string',
    },
  },
  anyOf: [],
  properties: {
    formNumber: {
      $ref: '#/definitions/formNumber',
    },
    vaFileNumber: {
      $ref: '#/definitions/vaFileNumber',
    },
    privacyAgreementAccepted: {
      $ref: '#/definitions/privacyAgreementAccepted',
    },
    sponsorAddress: {
      $ref: '#/definitions/centralMailAddress',
    },
    sponsorPhone: {
      $ref: '#/definitions/usaPhone',
    },
    veteranSocialSecurityNumber: {
      $ref: '#/definitions/ssn',
    },
    veteranFullName: {
      $ref: '#/definitions/fullName',
    },
    deceased: {
      $ref: '#/definitions/deceased',
    },
    deathDuringService: {
      $ref: '#/definitions/deathDuringService',
    },
  },
  required: ['veteranFullName', 'privacyAgreementAccepted'],
};

export default schema;
