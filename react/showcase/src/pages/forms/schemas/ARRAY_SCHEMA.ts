import {
  ArrayRendererOptions,
  ConnectedRenderersOptions,
  UiSchema,
} from '@genesislcap/foundation-forms'
import { JSONSchema7 } from 'json-schema'

export const uiSchemaArray: UiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/users',
      options: <ArrayRendererOptions>{
        childUiSchema: {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/firstname',
              label: 'First Name',
            },
            {
              type: 'Control',
              scope: '#/properties/lastname',
              label: 'Last Name',
            },
            {
              type: 'Control',
              scope: '#/properties/email',
              label: 'Email',
            },
            {
              type: 'Control',
              scope: '#/properties/rights',
              label: 'Rights',
            },
          ],
        },
      },
    },
  ],
}

export const JSON_SCHEMA_ARRAY = {
  type: 'object',
  properties: {
    users: {
      type: 'array',
      items: {
        type: 'object',
        title: 'Users',
        properties: {
          firstname: {
            type: 'string',
          },
          lastname: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          rights: {
            type: 'string',
          },
        },
        required: ['firstname'],
      },
    },
  },
} as JSONSchema7

export const uiSchemaArrayTrade: UiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/users',
      options: <ArrayRendererOptions>{
        childUiSchema: {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/instrumentId',
              label: 'Instrument ID',
              options: <ConnectedRenderersOptions>{
                allOptionsResourceName: 'ALL_POSITIONS',
                labelField: 'INSTRUMENT_NAME',
                valueField: 'INSTRUMENT_ID',
              },
            },
            {
              type: 'Control',
              scope: '#/properties/quantity',
              label: 'Quantity',
            },
            {
              type: 'Control',
              scope: '#/properties/side',
              label: 'Side',
            },
          ],
        },
      },
    },
  ],
}

export const JSON_SCHEMA_ARRAY_TRADE = {
  type: 'object',
  properties: {
    users: {
      type: 'array',
      items: {
        type: 'object',
        title: 'Users',
        properties: {
          instrumentId: {
            type: 'string',
          },
          quantity: {
            type: 'string',
          },
          side: {
            type: 'string',
          },
        },
        required: ['instrumentId', 'quantity', 'side'],
      },
    },
  },
} as JSONSchema7
