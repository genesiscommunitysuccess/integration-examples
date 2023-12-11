import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, AfterViewInit } from '@angular/core';
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
  @ViewChild('primitiveRenderers') primitiveRenderersElement!: any;
  @ViewChild('connectedComboboxRenderers') connectedComboboxRenderersElement!: any;
  @ViewChild('connectedComboboxAsyncRenderers') connectedComboboxAsyncRenderersElement!: any;
  @ViewChild('connectedComboboxLocalRenderers') connectedComboboxLocalRenderersElement!: any;
  @ViewChild('userArrayForm') userArrayFormElement!: any;
  @ViewChild('tradeArrayForm') tradeArrayFormElement!: any;
  @ViewChild('exampleGroupForm') exampleGroupFormElement!: any;
  @ViewChild('exampleCategorizationForm') exampleCategorizationFormElement!: any;
  @ViewChild('exampleStepperForm') exampleStepperFormElement!: any;
  @ViewChild('exampleStepperHorizontalForm') exampleStepperHorizontalFormElement!: any;
  @ViewChild('foundationFormWithDSPrefix') foundationFormWithDSPrefixElement!: any;

  ngAfterViewInit() {
    this.primitiveRenderersElement.nativeElement.uischema = uiSchema;
    this.primitiveRenderersElement.nativeElement.jsonSchema = JSON_SCHEMA;

    this.connectedComboboxRenderersElement.nativeElement.uischema = uiSchemaConnectedSelect;
    this.connectedComboboxRenderersElement.nativeElement.jsonSchema = JSON_SCHEMA_CONNECTED_SELECT;

    this.connectedComboboxAsyncRenderersElement.nativeElement.uischema = uiSchemaConnectedSelectAsync;
    this.connectedComboboxAsyncRenderersElement.nativeElement.jsonSchema = JSON_SCHEMA_CONNECTED_SELECT;

    this.connectedComboboxLocalRenderersElement.nativeElement.uischema = uiSchemaConnectedNumber;
    this.connectedComboboxLocalRenderersElement.nativeElement.jsonSchema = JSON_SCHEMA_CONNECTED_NUMBER;
    this.connectedComboboxLocalRenderersElement.nativeElement.data = {
      NUMBER_RATE: 0,
    };

    this.userArrayFormElement.nativeElement.uischema = uiSchemaArray;
    this.userArrayFormElement.nativeElement.jsonSchema = JSON_SCHEMA_ARRAY;
    this.userArrayFormElement.nativeElement.data = {
      users: [
        {
          firstname: 'John',
          lastname: 'Doe',
          email: 'john@doe.com',
          rights: 'ADMIN',
        },
      ],
    };

    this.tradeArrayFormElement.nativeElement.uischema = uiSchemaArrayTrade;
    this.tradeArrayFormElement.nativeElement.jsonSchema = JSON_SCHEMA_ARRAY_TRADE;
    this.tradeArrayFormElement.nativeElement.data = {
      users: [
        {
          instrumentId: 'VOD',
          quantity: '500',
          side: 'BUY',
        },
      ],
    };

    this.exampleGroupFormElement.nativeElement.uischema = uiSchemaGroup;
    this.exampleGroupFormElement.nativeElement.jsonSchema = JSON_SCHEMA_GROUP;
    this.exampleGroupFormElement.nativeElement.data = {
      person: { firstName: 'John' },
      address: { city: 'London' },
    };

    this.exampleCategorizationFormElement.nativeElement.uischema = uiSchemaCategorization;
    this.exampleCategorizationFormElement.nativeElement.jsonSchema = JSON_SCHEMA_CATEGORIZATION;

    this.exampleStepperFormElement.nativeElement.uischema = uiSchemaStepper;
    this.exampleStepperFormElement.nativeElement.jsonSchema = JSON_SCHEMA_STEPPER;

    this.exampleStepperHorizontalFormElement.nativeElement.uischema = uiSchemaStepperHorizontal;
    this.exampleStepperHorizontalFormElement.nativeElement.jsonSchema = JSON_SCHEMA_STEPPER;

    this.foundationFormWithDSPrefixElement.nativeElement.uischema = uiSchema;
    this.foundationFormWithDSPrefixElement.nativeElement.jsonSchema = JSON_SCHEMA;
    this.foundationFormWithDSPrefixElement.nativeElement.data = {
      ISSUER_NAME: 'Some Issuer',
      INVIS: 'Invisible value!',
      USER: 'JohnDoe',
      DATE: 1690848000000,
    };

    
  }
}
