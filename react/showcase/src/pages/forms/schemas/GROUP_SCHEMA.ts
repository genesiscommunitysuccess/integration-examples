import { GroupRendererOptions, UiSchema } from '@genesislcap/foundation-forms'
import { JSONSchema7 } from 'json-schema'

export const uiSchemaGroup: UiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Group',
      label: 'PERSON - GROUP',
      scope: '#/properties/person',
      options: <GroupRendererOptions>{
        childElements: [
          {
            type: 'LayoutVertical2Columns',
            elements: [
              {
                type: 'Control',
                label: 'First Name',
                scope: '#/properties/person/properties/firstName',
              },
              {
                type: 'Control',
                scope: '#/properties/person/properties/lastName',
              },
            ],
          },
          {
            type: 'LayoutVertical2Columns',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/person/properties/age',
              },
              {
                type: 'Control',
                label: 'Address',
                scope: '#/properties/person/properties/shippingAddress',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'Group',
      label: 'ADDRESS - GROUP',
      scope: '#/properties/address',
      options: <GroupRendererOptions>{
        childElements: [
          {
            type: 'LayoutVertical2Columns',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/person/properties/shippingAddress',
              },
              {
                type: 'Control',
                scope: '#/properties/address/properties/street',
              },
            ],
          },
          {
            type: 'LayoutVertical2Columns',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/address/properties/city',
              },
              {
                type: 'Control',
                scope: '#/properties/address/properties/zipCode',
              },
            ],
          },
        ],
      },
    },
  ],
}

export const JSON_SCHEMA_GROUP = {
  type: 'object',
  properties: {
    person: {
      title: 'Person',
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
        },
        lastName: {
          type: 'string',
        },
        age: {
          description: 'Age in years',
          type: 'integer',
          minimum: 0,
        },
        shippingAddress: {
          $ref: '#/properties/address/properties/addressId',
        },
      },
      required: ['firstName', 'lastName'],
    },
    address: {
      title: 'Order',
      type: 'object',
      properties: {
        addressId: {
          type: 'string',
          label: 'Address Type',
          enum: ['Home Address 1', 'Home Address 2', 'Workplace'],
        },
        street: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
        zipCode: {
          type: 'string',
        },
      },
    },
  },
} as JSONSchema7
