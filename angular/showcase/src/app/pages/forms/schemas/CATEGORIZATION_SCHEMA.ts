import { CategorizationRendererOptions, UiSchema } from '@genesislcap/foundation-forms';
import { JSONSchema7 } from 'json-schema';

export const uiSchemaCategorization: UiSchema = {
  type: 'Categorization',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/basic',
      label: 'Person',
      options: <CategorizationRendererOptions>{
        childElements: [
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/firstName',
              },
              {
                type: 'Control',
                scope: '#/properties/secondName',
              },
              {
                type: 'Control',
                scope: '#/properties/email',
              },
            ],
          },
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/birthDate',
              },
              {
                type: 'Control',
                scope: '#/properties/nationality',
              },
              {
                type: 'Control',
                scope: '#/properties/rights',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'Control',
      label: 'Address',
      scope: '#/properties/address',
      options: <CategorizationRendererOptions>{
        childElements: [
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/address/properties/street',
              },
              {
                type: 'Control',
                scope: '#/properties/address/properties/streetNumber',
              },
            ],
          },
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/address/properties/city',
              },
              {
                type: 'Control',
                scope: '#/properties/address/properties/postalCode',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'Control',
      label: 'Additional',
      scope: '#/properties/additional',
      options: <CategorizationRendererOptions>{
        childElements: [
          {
            type: 'VerticalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/vegetarianOptions/properties/favoriteVegetable',
              },
              {
                type: 'Control',
                scope: '#/properties/vegetarianOptions/properties/otherFavoriteVegetable',
              },
            ],
          },
        ],
      },
    },
  ],
};

export const JSON_SCHEMA_CATEGORIZATION = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      minLength: 3,
    },
    secondName: {
      type: 'string',
      minLength: 3,
    },
    birthDate: {
      type: 'string',
    },
    nationality: {
      type: 'string',
    },
    rights: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    address: {
      type: 'object',
      properties: {
        street: {
          type: 'string',
        },
        streetNumber: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
        postalCode: {
          type: 'string',
          maxLength: 5,
        },
      },
    },
    vegetarianOptions: {
      type: 'object',
      properties: {
        favoriteVegetable: {
          type: 'string',
          enum: ['Tomato', 'Potato', 'Salad', 'Aubergine', 'Cucumber', 'Other'],
        },
        otherFavoriteVegetable: {
          type: 'string',
        },
      },
    },
  },
} as JSONSchema7;
