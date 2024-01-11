import { useRef, useState, useEffect } from 'react'
import style from './FiltersPage.module.css'

const FiltersPage = () => {
  const allUsersFiltersRef = useRef<any>(null)
  const allTradesFiltersRef = useRef<any>(null)
  const allProfilesFiltersRef = useRef<any>(null)
  const [allUsersfilters, setAllUsersfilters] = useState('')
  const [allTradesfilters, setAllTradesfilters] = useState('')
  const [allProfilesfilters, setAllProfilesfilters] = useState('')

  const handleChange = (setMethod: any, event: any) => {
    console.log({event})
    setMethod(event?.target?.value)
  }

  const handleSubmit = () =>{
    console.log('$emit test');
  }

  useEffect(() => {
    const handleChangeAllUsersfilters = handleChange.bind(this, setAllUsersfilters);
    const handleChangeAllTradesfilters = handleChange.bind(this, setAllTradesfilters);
    const handleChangeAllProfilesfilters = handleChange.bind(this, setAllProfilesfilters);

    if(allUsersFiltersRef.current) {
      allUsersFiltersRef.current.addEventListener('change', handleChangeAllUsersfilters)
    }

    if (allTradesFiltersRef.current) {
      allTradesFiltersRef.current.uischema = {
        type: 'VerticalLayout',
        elements: [
          {
            type: 'Control',
            label: 'Date',
            scope: '#/properties/TRADE_DATETIME',
          },
        ],
      };
      allTradesFiltersRef.current.jsonSchema = {
        type: 'object',
        properties: {
          TRADE_DATETIME: {
            type: 'string',
            description: 'org.joda.time.DateTime',
          },
        },
      };
      allTradesFiltersRef.current.addEventListener('change', handleChangeAllTradesfilters)
      allTradesFiltersRef.current.addEventListener('submit', handleSubmit)
    }

    if(allProfilesFiltersRef.current) {
      allProfilesFiltersRef.current.addEventListener('change', handleChangeAllProfilesfilters)
    }

    return () => {
      if(allUsersFiltersRef.current) {
        allUsersFiltersRef.current.removeEventListener('change', handleChangeAllUsersfilters)
      }

      if(allTradesFiltersRef.current) {
        allTradesFiltersRef.current.removeEventListener('change', handleChangeAllTradesfilters)
        allTradesFiltersRef.current.removeEventListener('submit', handleSubmit)
      }

      if(allProfilesFiltersRef.current) {
        allProfilesFiltersRef.current.removeEventListener('change', handleChangeAllProfilesfilters)
      }
    }
  }, [])
  return (
    <zero-tabs class={style['filters-page']}>
      <zero-tab slot="tab">ALL_USERS</zero-tab>
      <zero-tab slot="tab">ALL_TRADES</zero-tab>
      <zero-tab slot="tab">ALL_TRADES - UI SCHEMA</zero-tab>
      <zero-tab slot="tab">ALL_PROFILES</zero-tab>
      <zero-tab-panel slot="tabpanel">
        <div className={style.container}>
          <zero-card>
            <foundation-filters
              ref={allUsersFiltersRef}
              resourceName="ALL_USERS"
            ></foundation-filters>
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
            <foundation-filters
              ref={allTradesFiltersRef}
              resourceName="ALL_TRADES"
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
            <foundation-filters
              ref={allTradesFiltersRef}
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
            <foundation-filters
              ref={allProfilesFiltersRef}
              resourceName="ALL_PROFILES"
            ></foundation-filters>
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

  )
}

export default FiltersPage
