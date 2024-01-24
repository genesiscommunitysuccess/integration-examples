import { useRef, useEffect } from 'react';
import style from './FormsPage.module.css';
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

const FormsPage = () => {
  const primitiveRenderers = useRef<any>(null);
  const connectedComboboxRenderers = useRef<any>(null);
  const connectedComboboxAsyncRenderers = useRef<any>(null);
  const connectedComboboxLocalRenderers = useRef<any>(null);
  const userArrayForm = useRef<any>(null);
  const tradeArrayForm = useRef<any>(null);
  const exampleGroupForm = useRef<any>(null);
  const exampleCategorizationForm = useRef<any>(null);
  const exampleStepperForm = useRef<any>(null);
  const exampleStepperHorizontalForm = useRef<any>(null);
  const foundationFormWithDSPrefix = useRef<any>(null);

  //@todo fix unknown issue where data is set to empty from child component
  const setUserArrayFormElementData = (event: any) => {
    if (!event.detail.data.users && userArrayForm.current) {
      userArrayForm.current.data = {
        users: [
          {
            firstname: 'John',
            lastname: 'Doe',
            email: 'john@doe.com',
            rights: 'ADMIN',
          },
        ],
      };
    }
  };

  //@todo fix unknown issue where data is set to empty from child component
  const setTradeArrayFormElement = (event: any) => {
    if (!event.detail.data.users && tradeArrayForm.current) {
      tradeArrayForm.current.data = {
        users: [
          {
            instrumentId: 'VOD',
            quantity: '500',
            side: 'BUY',
          },
        ],
      };
    }
  };

  useEffect(() => {
    if (primitiveRenderers.current) {
      primitiveRenderers.current.uischema = uiSchema;
      primitiveRenderers.current.jsonSchema = JSON_SCHEMA;
    }

    if (connectedComboboxRenderers.current) {
      connectedComboboxRenderers.current.uischema = uiSchemaConnectedSelect;
      connectedComboboxRenderers.current.jsonSchema =
        JSON_SCHEMA_CONNECTED_SELECT;
    }

    if (connectedComboboxAsyncRenderers.current) {
      connectedComboboxAsyncRenderers.current.uischema =
        uiSchemaConnectedSelectAsync;
      connectedComboboxAsyncRenderers.current.jsonSchema =
        JSON_SCHEMA_CONNECTED_SELECT;
    }

    if (connectedComboboxLocalRenderers.current) {
      connectedComboboxLocalRenderers.current.uischema = uiSchemaConnectedNumber;
      connectedComboboxLocalRenderers.current.jsonSchema =
        JSON_SCHEMA_CONNECTED_NUMBER;
      connectedComboboxLocalRenderers.current.data = {
        NUMBER_RATE: 0,
      };
    }

    if (userArrayForm.current) {
      userArrayForm.current.uischema = uiSchemaArray;
      userArrayForm.current.jsonSchema = JSON_SCHEMA_ARRAY;
      userArrayForm.current.addEventListener(
        'data-change',
        setUserArrayFormElementData,
      );
    }

    if (tradeArrayForm.current) {
      tradeArrayForm.current.uischema = uiSchemaArrayTrade;
      tradeArrayForm.current.jsonSchema = JSON_SCHEMA_ARRAY_TRADE;

      userArrayForm.current.addEventListener(
        'data-change',
        setTradeArrayFormElement,
      );
    }

    if (exampleGroupForm.current) {
      exampleGroupForm.current.uischema = uiSchemaGroup;
      exampleGroupForm.current.jsonSchema = JSON_SCHEMA_GROUP;
      exampleGroupForm.current.data = {
        person: { firstName: 'John' },
        address: { city: 'London' },
      };
    }

    if (exampleCategorizationForm.current) {
      exampleCategorizationForm.current.uischema = uiSchemaCategorization;
      exampleCategorizationForm.current.jsonSchema = JSON_SCHEMA_CATEGORIZATION;
    }

    if (exampleStepperForm.current) {
      exampleStepperForm.current.uischema = uiSchemaStepper;
      exampleStepperForm.current.jsonSchema = JSON_SCHEMA_STEPPER;
    }

    if (exampleStepperHorizontalForm.current) {
      exampleStepperHorizontalForm.current.uischema = uiSchemaStepperHorizontal;
      exampleStepperHorizontalForm.current.jsonSchema = JSON_SCHEMA_STEPPER;
    }

    if (foundationFormWithDSPrefix.current) {
      foundationFormWithDSPrefix.current.uischema = uiSchema;
      foundationFormWithDSPrefix.current.jsonSchema = JSON_SCHEMA;
      foundationFormWithDSPrefix.current.data = {
        ISSUER_NAME: 'Some Issuer',
        INVIS: 'Invisible value!',
        USER: 'JohnDoe',
        DATE: 1690848000000,
      };
    }
  }, []);

  return (
    <zero-tabs class={style['forms-page']}>
      <span slot="start">Foundation Forms</span>
      <zero-tab>Primitive Renderers</zero-tab>
      <zero-tab>Connected Renderers</zero-tab>
      <zero-tab>Array Renderer</zero-tab>
      <zero-tab>Group Renderer</zero-tab>
      <zero-tab>Categorization Renderer</zero-tab>
      <zero-tab>Stepper Renderer</zero-tab>
      <zero-tab>Autogenerated UI Schema clipboard</zero-tab>
      <zero-tab>Foundation Forms with DS prefix</zero-tab>

      <zero-tab-panel>
        <div className={style['form-container']}>
          <h2>Primitive Renderers</h2>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <foundation-form ref={primitiveRenderers}></foundation-form>
          </div>
        </div>
      </zero-tab-panel>
      <zero-tab-panel>
        <div className={style['form-container']}>
          <h2>Examples</h2>
          <h3>1. Connected Combobox/Multiselect</h3>
          <foundation-form ref={connectedComboboxRenderers}></foundation-form>
          <h3>2. Connected Combobox/Multiselect with async mode</h3>
          <foundation-form
            ref={connectedComboboxAsyncRenderers}
          ></foundation-form>
          <h3>3. Connected Combobox with local data</h3>
          <foundation-form
            ref={connectedComboboxLocalRenderers}
          ></foundation-form>
        </div>
      </zero-tab-panel>
      <zero-tab-panel>
        <div className={style['form-container']}>
          <h2>Examples</h2>
          <h3>1. User Array Form</h3>
          <foundation-form ref={userArrayForm}></foundation-form>
          <h3>1. Trade Array Form</h3>
          <foundation-form ref={tradeArrayForm}></foundation-form>
        </div>
      </zero-tab-panel>
      <zero-tab-panel>
        <div className={style['form-container']}>
          <h2>Example</h2>
          <foundation-form
            ref={exampleGroupForm}
            design-system-prefix="fast"
          ></foundation-form>
        </div>
      </zero-tab-panel>
      <zero-tab-panel>
        <div className={style['form-container']}>
          <h2>Example</h2>
          <zero-card style={{ width: '50%', padding: '0 15px' }}>
            <foundation-form ref={exampleCategorizationForm}></foundation-form>
          </zero-card>
        </div>
      </zero-tab-panel>
      <zero-tab-panel>
        <div className={style['form-container']}>
          <h2>Examples</h2>
          <h3>1. Vertical Stepper Form</h3>
          <foundation-form
            ref={exampleStepperForm}
            style={{ height: '400px' }}
            hide-submit-button
          ></foundation-form>
          <h3>2. Horizontal Stepper Form</h3>
          <foundation-form
            ref={exampleStepperHorizontalForm}
            style={{ height: '500px' }}
            hide-submit-button
          ></foundation-form>
        </div>
      </zero-tab-panel>
      <zero-tab-panel>
        <div className={style['form-container']}>
          <h2>Autogenerated UI Schema clipboard on DEV mode</h2>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <foundation-form resourceName="EVENT_INSTRUMENT_INSERT"></foundation-form>
          </div>
        </div>
      </zero-tab-panel>
      <zero-tab-panel>
        <div className={style['form-container']}>
          <h2>Foundation Forms with DS prefix</h2>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <foundation-form
              ref={foundationFormWithDSPrefix}
              design-system-prefix="fast"
            ></foundation-form>
          </div>
        </div>
      </zero-tab-panel>
    </zero-tabs>
  );
};

export default FormsPage;
