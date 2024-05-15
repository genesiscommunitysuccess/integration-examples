import { useContext } from 'react';
import { DatasourceDefaults } from '@genesislcap/foundation-comms';
import styles from './GridProClientDatasource.module.css';
import StateChangerContext from '../../../store/StateChanger/StateChangerContext';

const GridProClientDatasource = () => {
  const stateChangerContext = useContext(StateChangerContext);
  if (!stateChangerContext) {
    throw new Error('StateChangerContext is not defined');
  }
  const { state: stateChangerState } = stateChangerContext;
  const classNameRoot = styles['grid-pro-client-datasource'];
  const customBooleanColDefs: any = [
    {
      headerName: 'Process Status', // sets custom header for this field
      field: 'PROCESS_STATUS',
      width: 200,
      cellRenderer: ({ data }: any) => {
        return `<span class="process-status-${
          data.ENABLED ? 'enabled' : 'disabled'
        }">Custom ${data.ENABLED ? 'Enabled' : 'Disabled'}</span>`;
      }, // custom renderer for this field
      cellClass: 'process-status',
    },
    {
      headerName: 'Process SUPER SECURE', // sets custom header for this field
      field: 'PROCESS_SECURE',
      width: 100,
      cellRenderer: 'boolean',
    },
  ];
  const rowRewfDefinition = {
    headerName: 'Row ref',
    field: 'ROW_REF',
    cellRenderer: ({ data }: any) => {
      return `<span style="color:#555">${data.ROW_REF}</span>`;
    },
  };
  const maxView = DatasourceDefaults.MAX_VIEW_1000;
  const maxRows = DatasourceDefaults.MAX_ROWS_250;

  const customGridProCell2Renderer = (params: any) => {
    return `<span style="color: ${
      params.value === 'TRACE' ? 'orange' : 'green'
    }">Custom ${params.value}</span>`;
  };

  return (
    <zero-grid-layout
      row-count="4"
      col-count="2"
      class={`${classNameRoot} content-around spacing-2x`}
    >
      <zero-grid-layout-item col-number="1" row-number="1" width="1" height="1">
        <zero-card>
          <p>(stream)</p>
          <zero-grid-pro
            persist-column-state-key="grid-pro-simple-column-state"
            async-add
            enable-row-flashing
            enable-cell-flashing
          >
            <grid-pro-client-side-datasource
              resource-name={stateChangerState.resourceName}
              criteria={stateChangerState.criteria}
              is-snapshot={false}
              max-rows={maxRows}
              max-view={maxView}
              reverse={false}
              restart-on-reconnection={false}
            ></grid-pro-client-side-datasource>
          </zero-grid-pro>
        </zero-card>
      </zero-grid-layout-item>
      <zero-grid-layout-item col-number="1" row-number="2" width="1" height="1">
        <zero-card>
          <p>(stream + autoCellRendererByType)</p>
          <zero-grid-pro
            auto-cell-renderer-by-type
            persist-column-state-key="grid-pro-complex-column-state"
            async-add
            enable-row-flashing
            enable-cell-flashing
          >
            <grid-pro-client-side-datasource
              resource-name={stateChangerState.resourceName}
              criteria={stateChangerState.criteria}
              is-snapshot={false}
              max-rows={maxRows}
              max-view={maxView}
              reverse={false}
              restart-on-reconnection={false}
            ></grid-pro-client-side-datasource>
            {customBooleanColDefs.map((colDef: any, index: number) => {
              return (
                <grid-pro-column
                  key={`itemgrid-pro-column1-${index}`}
                  definition={colDef}
                >
                  {!!colDef.cellRenderer && <grid-pro-cell></grid-pro-cell>}
                </grid-pro-column>
              );
            })}
            <grid-pro-column definition={rowRewfDefinition}>
              <grid-pro-cell></grid-pro-cell>
            </grid-pro-column>
          </zero-grid-pro>
        </zero-card>
      </zero-grid-layout-item>

      <zero-grid-layout-item col-number="1" row-number="3" width="1" height="1">
        <zero-card>
          <p>(stream + reverse=true)</p>
          <zero-grid-pro
            persist-column-state-key="grid-pro-simple-column-state"
            async-add
            enable-row-flashing
            enable-cell-flashing
          >
            <grid-pro-client-side-datasource
              resource-name={stateChangerState.resourceName}
              criteria={stateChangerState.criteria}
              is-snapshot={false}
              max-rows={maxRows}
              max-view={maxView}
              reverse={true}
              restart-on-reconnection={false}
            ></grid-pro-client-side-datasource>
          </zero-grid-pro>
        </zero-card>
      </zero-grid-layout-item>

      <zero-grid-layout-item col-number="1" row-number="4" width="1" height="1">
        <zero-card>
          <p>(stream + reverse=true + max-rows=5)</p>
          <zero-grid-pro
            persist-column-state-key="grid-pro-simple-column-state"
            async-add
            enable-row-flashing
            enable-cell-flashing
          >
            <grid-pro-client-side-datasource
              resource-name={stateChangerState.resourceName}
              criteria={stateChangerState.criteria}
              is-snapshot={false}
              max-rows={5}
              max-view={maxView}
              reverse={true}
              restart-on-reconnection={false}
            ></grid-pro-client-side-datasource>
          </zero-grid-pro>
        </zero-card>
      </zero-grid-layout-item>

      <zero-grid-layout-item col-number="2" row-number="1" width="1" height="1">
        <zero-card>
          <p>(snapshot)</p>
          <zero-grid-pro
            persist-column-state-key="grid-pro-simple-column-state"
            async-add
            enable-row-flashing
            enable-cell-flashing
          >
            <grid-pro-client-side-datasource
              resource-name={stateChangerState.resourceName}
              criteria={stateChangerState.criteria}
              is-snapshot={true}
              max-rows={maxRows}
              max-view={maxView}
              reverse={false}
              restart-on-reconnection={true}
            ></grid-pro-client-side-datasource>
          </zero-grid-pro>
        </zero-card>
      </zero-grid-layout-item>

      <zero-grid-layout-item col-number="2" row-number="2" width="1" height="1">
        <zero-card>
          <p>(snapshot + autoCellRendererByType)</p>
          <zero-grid-pro
            auto-cell-renderer-by-type
            persist-column-state-key="grid-pro-complex-column-state2"
            async-add
            enable-row-flashing
            enable-cell-flashing
          >
            <grid-pro-client-side-datasource
              resource-name={stateChangerState.resourceName}
              criteria={stateChangerState.criteria}
              is-snapshot={true}
              max-rows={maxRows}
              max-view={maxView}
              reverse={false}
              restart-on-reconnection={true}
            ></grid-pro-client-side-datasource>
            {customBooleanColDefs.map((colDef: any, index: number) => {
              return (
                <grid-pro-column
                  key={`itemgrid-pro-column2-${index}`}
                  definition={colDef}
                >
                  {!!colDef.cellRenderer && <grid-pro-cell></grid-pro-cell>}
                </grid-pro-column>
              );
            })}
            <grid-pro-column definition={rowRewfDefinition}>
              <grid-pro-cell renderer={customGridProCell2Renderer}></grid-pro-cell>
            </grid-pro-column>
          </zero-grid-pro>
        </zero-card>
      </zero-grid-layout-item>

      <zero-grid-layout-item col-number="2" row-number="3" width="1" height="1">
        <zero-card>
          <p>(snapshot + reverse=true)</p>
          <zero-grid-pro
            persist-column-state-key="grid-pro-simple-column-state"
            async-add
            enable-row-flashing
            enable-cell-flashing
          >
            <grid-pro-client-side-datasource
              resource-name={stateChangerState.resourceName}
              criteria={stateChangerState.criteria}
              is-snapshot={true}
              max-rows={maxRows}
              max-view={maxView}
              reverse={true}
              restart-on-reconnection={true}
            ></grid-pro-client-side-datasource>
          </zero-grid-pro>
        </zero-card>
      </zero-grid-layout-item>

      <zero-grid-layout-item col-number="2" row-number="4" width="1" height="1">
        <zero-card>
          <p>(snapshot + reverse=true + max-rows=5)</p>
          <zero-grid-pro
            persist-column-state-key="grid-pro-simple-column-state"
            async-add
            enable-row-flashing
            enable-cell-flashing
          >
            <grid-pro-client-side-datasource
              resource-name={stateChangerState.resourceName}
              criteria={stateChangerState.criteria}
              is-snapshot={true}
              max-rows={5}
              max-view={maxView}
              reverse={true}
              restart-on-reconnection={true}
            ></grid-pro-client-side-datasource>
          </zero-grid-pro>
        </zero-card>
      </zero-grid-layout-item>
    </zero-grid-layout>
  );
};

export default GridProClientDatasource;
