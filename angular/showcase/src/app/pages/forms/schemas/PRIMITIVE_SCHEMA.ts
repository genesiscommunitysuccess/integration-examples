import {
  mustMatch,
  StandardRendererOptions,
  StringRendererOptions,
  UiSchema,
} from '@genesislcap/foundation-forms';
import { JSONSchema7 } from 'json-schema';

const CEO_MIN_LENGTH = 3;

export const uiSchema: UiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      label: 'Address',
      scope: '#/properties/COMPANY_ADDRESS',
    },
    {
      type: 'Control',
      label: 'CEO',
      scope: '#/properties/COMPANY_CEO',
      options: <StandardRendererOptions>{
        validateFn:
          // custom validateFn example
          (data, path, label) => {
            const name = data?.[path];
            if (name?.length < CEO_MIN_LENGTH) {
              return [
                {
                  instancePath: `/${path}`,
                  message: `Too short`,
                  schemaPath: '',
                  keyword: '',
                  params: {},
                },
              ];
            }
            return []; // technically should always return an array (but it's handled upstream if you forget)
          },
      },
    },
    {
      type: 'Control',
      label: 'Issuer Name',
      scope: '#/properties/ISSUER_NAME',
      options: <StringRendererOptions>{
        textarea: true,
      },
    },
    {
      type: 'Control',
      label: 'Phone',
      scope: '#/properties/MAIN_CONTACT',
    },
    {
      type: 'Control',
      label: 'Date',
      scope: '#/properties/DATE',
    },
    {
      type: 'Control',
      scope: '#/properties/INVIS',
      options: <StandardRendererOptions>{
        hidden: true,
      },
    },
    {
      type: 'Control',
      label: 'Password',
      scope: '#/properties/PASSWORD',
      options: <StringRendererOptions>{
        isPassword: true,
      },
    },
    {
      type: 'Control',
      label: 'Password confirmation',
      scope: '#/properties/PASSWORD_CONFIRMATION',
      options: <StandardRendererOptions | StringRendererOptions>{
        isPassword: true,
        validateFn: mustMatch('PASSWORD'),
      },
    },
  ],
};

export const JSON_SCHEMA = {
  type: 'object',
  properties: {
    COMPANY_ADDRESS: {
      oneOf: [
        {
          type: 'null',
        },
        {
          type: 'string',
        },
      ],
      description: 'kotlin.String',
    },
    FREQUENCY: {
      type: 'string',
      enum: ['QUARTERLY', 'SEMI_ANNUAL', 'ANNUAL'],
      description: 'global.genesis.gen.dao.enums.Frequency',
    },
    ISSUER_NAME: {
      type: 'string',
      minLength: 3,
      description: 'kotlin.String',
    },
    USER: {
      type: 'string',
      description: 'kotlin.String',
    },
    DATE: {
      type: 'number',
      description: 'org.joda.time.DateTime',
    },
    MAIN_CONTACT: {
      type: 'string',
      pattern: '^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$',
      description: 'kotlin.String',
    },
    INVIS: {
      type: 'string',
      description: 'kotlin.String',
    },
    PASSWORD: {
      type: 'string',
      description: 'kotlin.String',
    },
    PASSWORD_CONFIRMATION: {
      type: 'string',
      description: 'kotlin.String',
    },
  },
  additionalProperties: false,
  required: ['ISSUER_NAME', 'MAIN_CONTACT'],
} as JSONSchema7;
