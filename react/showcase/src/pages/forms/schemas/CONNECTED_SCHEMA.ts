import {
  ConnectedRenderersOptions,
  UiSchema,
} from '@genesislcap/foundation-forms';
import { JSONSchema7 } from 'json-schema';

export const uiSchemaConnectedSelect: UiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/TRADES',
      options: <ConnectedRenderersOptions>{
        allOptionsResourceName: 'ALL_TRADES',
        valueField: 'TRADE_ID',
        labelField: 'TRADE_ID',
      },
    },
    {
      type: 'Control',
      scope: '#/properties/RIGHTS',
      options: <ConnectedRenderersOptions>{
        allOptionsResourceName: 'RIGHT',
        valueField: 'CODE',
        labelField: 'CODE',
      },
    },
  ],
};

export const uiSchemaConnectedSelectAsync: UiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/TRADES',
      options: <ConnectedRenderersOptions>{
        allOptionsResourceName: 'ALL_TRADES',
        valueField: 'TRADE_ID',
        labelField: 'TRADE_ID',
        async: true,
      },
    },
    {
      type: 'Control',
      scope: '#/properties/RIGHTS',
      options: <ConnectedRenderersOptions>{
        allOptionsResourceName: 'RIGHT',
        valueField: 'CODE',
        labelField: 'CODE',
        async: true,
      },
    },
  ],
};

export const JSON_SCHEMA_CONNECTED_SELECT = {
  type: 'object',
  properties: {
    TRADES: {
      type: 'string',
      description: 'kotlin.String',
    },
    RIGHTS: {
      type: 'array',
      description: 'kotlin.String',
    },
  },
} as JSONSchema7;

const numberRateData = [
  {
    name: '0%',
    value: 0,
  },
  {
    name: '24%',
    value: 0.24,
  },
  {
    name: '30%',
    value: 0.3,
  },
];

export const uiSchemaConnectedNumber: UiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      label: 'Number Rate',
      scope: '#/properties/NUMBER_RATE',
      options: <ConnectedRenderersOptions>{
        valueField: 'value',
        labelField: 'name',
        data: numberRateData,
      },
      type: 'Control',
    },
  ],
};

export const JSON_SCHEMA_CONNECTED_NUMBER = {
  type: 'object',
  properties: {
    NUMBER_RATE: {
      type: 'number',
      description: 'kotlin.Double',
    },
  },
} as JSONSchema7;
