import { useState } from 'react';
import style from './FiltersPage.module.css';
import reactifyWc from 'reactify-wc';

const FoundationFilters: any= reactifyWc('foundation-filters');

const FiltersPage = () => {
  const [allUsersfilters, setAllUsersfilters] = useState('');
  const [allTradesfilters, setAllTradesfilters] = useState('');
  const [allProfilesfilters, setAllProfilesfilters] = useState('');

  const handleChange = (setMethod: any, event: any) => {
    setMethod(event?.target?.value);
  };

  const handleSubmit = () => {
    console.log('$emit test');
  };

  const handleChangeAllUsersfilters = handleChange.bind(
    this,
    setAllUsersfilters,
  );
  const handleChangeAllTradesfilters = handleChange.bind(
    this,
    setAllTradesfilters,
  );
  const handleChangeAllProfilesfilters = handleChange.bind(
    this,
    setAllProfilesfilters,
  );

  const tradesUISchema = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        label: 'Date',
        scope: '#/properties/TRADE_DATETIME',
      },
    ],
  };

  const tradesJsonSchema = {
    type: 'object',
    properties: {
      TRADE_DATETIME: {
        type: 'string',
        description: 'org.joda.time.DateTime',
      },
    },
  };

  return (
    <zero-tabs class={style['filters-page']}>
      <zero-tab slot="tab">ALL_USERS</zero-tab>
      <zero-tab slot="tab">ALL_TRADES</zero-tab>
      <zero-tab slot="tab">ALL_TRADES - UI SCHEMA</zero-tab>
      <zero-tab slot="tab">ALL_PROFILES</zero-tab>
      <zero-tab-panel slot="tabpanel">
        <div className={style.container}>
          <zero-card>
            <FoundationFilters
              on-change={handleChangeAllUsersfilters}
              resourceName="ALL_USERS"
            ></FoundationFilters>
          </zero-card>
          <zero-grid-pro>
            <grid-pro-genesis-datasource
              resource-name="ALL_USERS"
              criteria={allUsersfilters}
            ></grid-pro-genesis-datasource>
          </zero-grid-pro>
        </div>
      </zero-tab-panel>
      <zero-tab-panel slot="tabpanel">
        <div className={style.container}>
          <zero-card>
            <FoundationFilters
              ui-schema={tradesUISchema}
              json-schema={tradesJsonSchema}
              on-change={handleChangeAllTradesfilters}
              submit={handleSubmit}
              resourceName="ALL_TRADES"
            ></FoundationFilters>
          </zero-card>
          <zero-grid-pro>
            <grid-pro-genesis-datasource
              resource-name="ALL_TRADES"
              criteria={allTradesfilters}
            ></grid-pro-genesis-datasource>
          </zero-grid-pro>
        </div>
      </zero-tab-panel>
      <zero-tab-panel slot="tabpanel">
        <div className={style.container}>
          <zero-card>
            <foundation-filters
              class="date-filter"
            ></foundation-filters>
          </zero-card>
          <zero-grid-pro>
            <grid-pro-genesis-datasource
              resource-name="ALL_TRADES"
              criteria={allTradesfilters}
            ></grid-pro-genesis-datasource>
          </zero-grid-pro>
        </div>
      </zero-tab-panel>
      <zero-tab-panel slot="tabpanel">
        <div className={style.container}>
          <zero-card>
            <FoundationFilters
              on-change={handleChangeAllProfilesfilters}
              resourceName="ALL_PROFILES"
            ></FoundationFilters>
          </zero-card>
          <zero-grid-pro>
            <grid-pro-genesis-datasource
              resource-name="ALL_PROFILES"
              criteria={allProfilesfilters}
            ></grid-pro-genesis-datasource>
          </zero-grid-pro>
        </div>
      </zero-tab-panel>
    </zero-tabs>
  );
};

export default FiltersPage;
