import { StepperRendererOptions, UiSchema } from '@genesislcap/foundation-forms';
import { JSONSchema7 } from 'json-schema';

export const uiSchemaStepper: UiSchema = {
  type: 'Stepper',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/person',
      label: 'Entity',
      options: <StepperRendererOptions>{
        childElements: [
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/person/properties/firstName',
              },
              {
                type: 'Control',
                scope: '#/properties/person/properties/secondName',
              },
            ],
          },
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/person/properties/birthDate',
              },
              {
                type: 'Control',
                scope: '#/properties/person/properties/nationality',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'Control',
      label: 'Doc',
      scope: '#/properties/address',
      options: <StepperRendererOptions>{
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
      label: 'Primary doc',
      scope: '#/properties/vegetarianOptions',
      options: <StepperRendererOptions>{
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

export const uiSchemaStepperHorizontal: UiSchema = {
  type: 'Stepper',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/person',
      label: 'Entity',
      options: <StepperRendererOptions>{
        childElements: [
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/person/properties/firstName',
              },
              {
                type: 'Control',
                scope: '#/properties/person/properties/secondName',
              },
            ],
          },
          {
            type: 'HorizontalLayout',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/person/properties/birthDate',
              },
              {
                type: 'Control',
                scope: '#/properties/person/properties/nationality',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'Control',
      label: 'Doc',
      scope: '#/properties/address',
      options: <StepperRendererOptions>{
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
      label: 'Primary doc',
      scope: '#/properties/vegetarianOptions',
      options: <StepperRendererOptions>{
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
  options: {
    orientation: 'horizontal',
  },
};

export const JSON_SCHEMA_STEPPER = {
  type: 'object',
  properties: {
    person: {
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
          type: 'number',
        },
        nationality: {
          type: 'string',
        },
      },
      required: ['firstName', 'secondName'],
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
      required: ['postalCode'],
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
      required: ['otherFavoriteVegetable'],
    },
  },
} as JSONSchema7;
