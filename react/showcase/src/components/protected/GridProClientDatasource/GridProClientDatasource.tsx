import { useRef, useContext, useEffect } from 'react';
import { css } from '@microsoft/fast-element';
import { SlottedStyles } from '@genesislcap/foundation-utils';
import { DatasourceDefaults } from '@genesislcap/foundation-comms';
import {
  GridProColumn,
  GridProCell,
} from '@genesislcap/foundation-zero-grid-pro';
import styles from './GridProClientDatasource.module.css';
import StateChangerContext from '../../../store/StateChanger/StateChangerContext';

const GridProClientDatasource = () => {
  const stateChangerContext = useContext(StateChangerContext);
  if (!stateChangerContext) {
    throw new Error('StateChangerContext is not defined');
  }
  const { state: stateChangerState } = stateChangerContext;
  const slottedStyles = useRef<SlottedStyles | null>(null);
  const slottedStyles2 = useRef<SlottedStyles | null>(null);
  const customGridProColumn = useRef<GridProColumn | null>(null);
  const customGridProColumn2 = useRef<GridProColumn | null>(null);
  const customGridProCell = useRef<GridProCell | null>(null);
  const customGridProCell2 = useRef<GridProCell | null>(null);
  const itemGridProColumnRefs = useRef<(HTMLElement | null)[]>([]);
  const itemGridProColumnRefs2 = useRef<(HTMLElement | null)[]>([]);
  const itemGridProCellRefs = useRef<(HTMLElement | null)[]>([]);
  const itemGridProCellRefs2 = useRef<(HTMLElement | null)[]>([]);
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
  const processGridStyles = css`
    .process-status-enabled {
      color: green;
    }
    .process-status-disabled {
      color: red;
    }
  `;
  const rowRewfDefinition = {
    headerName: 'Row ref',
    field: 'ROW_REF',
    cellRenderer: ({ data }: any) => {
      return `<span style="color:#555">${data.ROW_REF}</span>`;
    },
  };
  const maxView = DatasourceDefaults.MAX_VIEW_1000;
  const maxRows = DatasourceDefaults.MAX_ROWS_250;
  const getGridProColumns = (key: string, columnsRefs: any, cellRefs: any) =>
    customBooleanColDefs.map((colDef: any, index: number) => {
      return (
        <grid-pro-column
          key={`${key}-${index}`}
          ref={(el: HTMLElement | null) => (columnsRefs.current[index] = el)}
        >
          {!!colDef.cellRenderer && (
            <grid-pro-cell
              ref={(el: HTMLElement | null) => (cellRefs.current[index] = el)}
            ></grid-pro-cell>
          )}
        </grid-pro-column>
      );
    });

  useEffect(() => {
    //eslint-disable-next-line
    if (slottedStyles.current) {
      slottedStyles.current.styles = processGridStyles;
    }

    if (slottedStyles2.current) {
      slottedStyles2.current.styles = processGridStyles;
    }

    if (customGridProColumn.current) {
      customGridProColumn.current.definition = rowRewfDefinition;
    }

    if (customGridProColumn2.current) {
      customGridProColumn2.current.definition = rowRewfDefinition;
    }

    if (customGridProCell2.current) {
      customGridProCell2.current.renderer = (params: any) => {
        return `<span style="color: ${
          params.value === 'TRACE' ? 'orange' : 'green'
        }">Custom ${params.value}</span>`;
      };
    }

    if (itemGridProColumnRefs.current) {
      itemGridProColumnRefs.current.forEach(
        (itemGridProColumnElement: any, index: number) => {
          itemGridProColumnElement.definition = customBooleanColDefs[index];
        },
      );
    }

    if (itemGridProColumnRefs2.current) {
      itemGridProColumnRefs2.current.forEach(
        (itemGridProColumnElement: any, index: number) => {
          itemGridProColumnElement.definition = customBooleanColDefs[index];
        },
      );
    }
  }, []);

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
            <slotted-styles ref={slottedStyles}></slotted-styles>
            <grid-pro-client-side-datasource
              resource-name={stateChangerState.resourceName}
              criteria={stateChangerState.criteria}
              is-snapshot={false}
              max-rows={maxRows}
              max-view={maxView}
              reverse={false}
              restart-on-reconnection={false}
            ></grid-pro-client-side-datasource>
            {getGridProColumns(
              'itemGridProColumn',
              itemGridProColumnRefs,
              itemGridProCellRefs,
            )}
            <grid-pro-column ref={customGridProColumn}>
              <grid-pro-cell ref={customGridProCell}></grid-pro-cell>
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
            <slotted-styles ref={slottedStyles2}></slotted-styles>
            <grid-pro-client-side-datasource
              resource-name={stateChangerState.resourceName}
              criteria={stateChangerState.criteria}
              is-snapshot={true}
              max-rows={maxRows}
              max-view={maxView}
              reverse={false}
              restart-on-reconnection={true}
            ></grid-pro-client-side-datasource>
            {getGridProColumns(
              'itemGridProColumn2',
              itemGridProColumnRefs2,
              itemGridProCellRefs2,
            )}
            <grid-pro-column ref={customGridProColumn2}>
              <grid-pro-cell ref={customGridProCell2}></grid-pro-cell>
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
