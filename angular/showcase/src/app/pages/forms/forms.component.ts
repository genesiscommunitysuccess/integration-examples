import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  JSON_SCHEMA,
  JSON_SCHEMA_ARRAY,
  JSON_SCHEMA_ARRAY_TRADE,
  JSON_SCHEMA_CATEGORIZATION,
  JSON_SCHEMA_CONNECTED_NUMBER,
  JSON_SCHEMA_CONNECTED_SELECT,
  JSON_SCHEMA_GROUP,
  JSON_SCHEMA_STEPPER,
  uiSchema,
  uiSchemaArray,
  uiSchemaArrayTrade,
  uiSchemaCategorization,
  uiSchemaConnectedNumber,
  uiSchemaConnectedSelect,
  uiSchemaConnectedSelectAsync,
  uiSchemaGroup,
  uiSchemaStepper,
  uiSchemaStepperHorizontal,
} from './schemas';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormsComponent {
  //primitive renderers
  uiSchema = uiSchema;
  jsonSchema = JSON_SCHEMA;

  // connected combobox renderers
  uiSchemaConnectedSelect = uiSchemaConnectedSelect;
  jsonSchemaConnectedSelect = JSON_SCHEMA_CONNECTED_SELECT;

  // connected combobox async renderers
  uiSchemaConnectedSelectAsync = uiSchemaConnectedSelectAsync
  jsonSchemaConnectedSelectAsync = JSON_SCHEMA_CONNECTED_SELECT;

  // connected combobox local data renderers
  uiSchemaConnectedNumber = uiSchemaConnectedNumber
  jsonSchemaConnectedNumber = JSON_SCHEMA_CONNECTED_NUMBER;
  localData = {
    NUMBER_RATE: 0,
  };

  // array form
  uiSchemaArray = uiSchemaArray;
  jsonSchemaArray = JSON_SCHEMA_ARRAY;
  arrayFormData = {
    users: [
      {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@doe.com',
        rights: 'ADMIN',
      },
    ],
  }

  // array trade form
  uiSchemaArrayTrade = uiSchemaArrayTrade;
  jsonSchemaArrayTrade = JSON_SCHEMA_ARRAY_TRADE;
  arrayTradeFormData = {
    users: [
      {
        instrumentId: 'VOD',
        quantity: '500',
        side: 'BUY',
      },
    ],
  }

  // group form
  uiSchemaGroup = uiSchemaGroup;
  jsonSchemaGroup = JSON_SCHEMA_GROUP;
  groupData = {
    person: { firstName: 'John' },
    address: { city: 'London' },
  };

  // categorization form
  uiSchemaCategorization = uiSchemaCategorization;
  jsonSchemaCategorization = JSON_SCHEMA_CATEGORIZATION;

  // stepper form
  uiSchemaStepper = uiSchemaStepper;
  jsonSchemaStepper = JSON_SCHEMA_STEPPER;

  // stepper horizontal form
  uiSchemaStepperHorizontal = uiSchemaStepperHorizontal;

  // dsprefix form
  dsprefixData = {
    ISSUER_NAME: 'Some Issuer',
    INVIS: 'Invisible value!',
    USER: 'JohnDoe',
    DATE: 1690848000000,
  }
}
