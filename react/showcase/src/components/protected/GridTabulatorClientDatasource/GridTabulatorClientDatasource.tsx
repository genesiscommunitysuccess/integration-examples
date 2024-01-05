import { useRef, useEffect, useContext } from 'react'
import { DatasourceDefaults } from '@genesislcap/foundation-comms'
import { FoundationLayout } from '@genesislcap/foundation-layout'
import { LayoutComponentsNames } from './GridTabulatorClientDatasource.types'
import StateChangerContext from '../../../store/StateChanger/StateChangerContext'
import {
  setComponentItemsMap,
  getElementByTagFromComponent,
} from '../../../utils/goldenLayout.helper'

const GridTabulatorClientDatasource = () => {
  const stateChangerContext = useContext(StateChangerContext)
  if (!stateChangerContext) {
    throw new Error('StateChangerContext is not defined')
  }
  const { state: stateChangerState } = stateChangerContext
  const layoutComponentsMap: Map<LayoutComponentsNames, any> = new Map()
  const gridLayout = useRef<FoundationLayout | null>(null)
  const maxView = DatasourceDefaults.MAX_VIEW_1000
  const maxRows = DatasourceDefaults.MAX_ROWS_250
  const restartOnReconnection = true

  useEffect(() => {
    if (gridLayout.current) {
      setComponentItemsMap(gridLayout.current, layoutComponentsMap)
    }
  }, [])

  useEffect(() => {
    if (gridLayout.current) {
      layoutComponentsMap.forEach((component: any) => {
        const datasource = getElementByTagFromComponent(
          component,
          'grid-tabulator-client-side-datasource',
        )

        if (stateChangerState.resourceName) {
          datasource.resourceName = stateChangerState.resourceName
        }

        if (stateChangerState.criteria) {
          datasource.criteria = stateChangerState.criteria
        }
      })
    }
  }, [stateChangerState])

  return (
    <zero-layout ref={gridLayout}>
      <zero-layout-region type="vertical">
        <zero-layout-region>
          <zero-layout-item title="(stream)" closable>
            <zero-grid-tabulator
              registration="stream"
              persist-column-state-key="grid-tabulator-simple-column-state"
            >
              <grid-tabulator-client-side-datasource
                resource-name={stateChangerState.resourceName}
                criteria={stateChangerState.criteria}
                is-snapshot={false}
                max-rows={maxRows}
                max-view={maxView}
                reverse={false}
                restart-on-reconnection={restartOnReconnection}
              ></grid-tabulator-client-side-datasource>
            </zero-grid-tabulator>
          </zero-layout-item>
          <zero-layout-item registration="snapshot" title="(snapshot)" closable>
            <zero-grid-tabulator persist-column-state-key="grid-tabulator-simple-column-state">
              <grid-tabulator-client-side-datasource
                resource-name={stateChangerState.resourceName}
                criteria={stateChangerState.criteria}
                is-snapshot={true}
                max-rows={maxRows}
                max-view={maxView}
                reverse={false}
                restart-on-reconnection={restartOnReconnection}
              ></grid-tabulator-client-side-datasource>
            </zero-grid-tabulator>
          </zero-layout-item>
        </zero-layout-region>
      </zero-layout-region>
    </zero-layout>
  )
}

export default GridTabulatorClientDatasource
