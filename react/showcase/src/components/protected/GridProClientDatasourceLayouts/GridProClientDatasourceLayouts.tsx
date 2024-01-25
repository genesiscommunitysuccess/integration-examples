import { useRef, useContext, useEffect } from 'react';
import { css } from '@microsoft/fast-element';
import { DatasourceDefaults } from '@genesislcap/foundation-comms';
import {
  LayoutEmitEvents,
  FoundationLayout,
} from '@genesislcap/foundation-layout';
import {
  GridProColumn,
  GridProCell,
} from '@genesislcap/foundation-zero-grid-pro';
import { LayoutComponentsNames } from './GridProClientDatasourceLayouts.types';
import {
  setComponentItemsMap,
  getElementByTagFromComponent,
  getElementBySelectorFromComponent,
  getElementsBySelectorFromComponent,
} from '../../../utils/goldenLayout.helper';
import StateChangerContext from '../../../store/StateChanger/StateChangerContext';

const GridProClientDatasourceLayouts = () => {
  const stateChangerContext = useContext(StateChangerContext);
  if (!stateChangerContext) {
    throw new Error('StateChangerContext is not defined');
  }
  const { state: stateChangerState } = stateChangerContext;
  const layoutComponentsMap: Map<LayoutComponentsNames, any> = new Map();
  const gridLayout = useRef<FoundationLayout | null>(null);
  const itemGridProColumnRefs = useRef<(GridProColumn | null)[]>([]);
  const itemGridProColumnRefs2 = useRef<(GridProColumn | null)[]>([]);
  const itemGridProCellRefs = useRef<(GridProCell | null)[]>([]);
  const itemGridProCellRefs2 = useRef<(GridProCell | null)[]>([]);
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
  const processGridStyles2 = css`
    .process-status-enabled {
      color: lightblue;
    }
    .process-status-disabled {
      color: yellow;
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
          data-selector={key}
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
    if (layoutComponentsMap.size > 0) {
      layoutComponentsMap.forEach((component: any) => {
        const datasource = getElementByTagFromComponent(
          component,
          'grid-pro-client-side-datasource',
        );
        if (stateChangerState.resourceName) {
          datasource.resourceName = stateChangerState.resourceName;
        }
        if (stateChangerState.criteria) {
          datasource.criteria = stateChangerState.criteria;
        }
      });
    }
  }, [stateChangerState.resourceName, stateChangerState.criteria]);

  useEffect(() => {
    if (gridLayout.current) {
      setComponentItemsMap(gridLayout.current, layoutComponentsMap);

      const handleGridLayoutFirstLoaded = () => {
        const streamAutoCellComponent = layoutComponentsMap.get(
          LayoutComponentsNames.STREAM_AUTO_CELL_RENDERER_BY_TYPE,
        );

        if (streamAutoCellComponent) {
          const slottedStylesElement = getElementBySelectorFromComponent(
            streamAutoCellComponent,
            'slottedStyles',
          );
          const itemGridProColumnElements = getElementsBySelectorFromComponent(
            streamAutoCellComponent,
            'itemGridProColumn',
          );
          const customGridProColumnElement = getElementBySelectorFromComponent(
            streamAutoCellComponent,
            'customGridProColumn',
          );

          slottedStylesElement.styles = processGridStyles;
          itemGridProColumnElements.forEach(
            (itemGridProColumnElement: any, index: number) => {
              itemGridProColumnElement.definition = customBooleanColDefs[index];
            },
          );
          customGridProColumnElement.definition = rowRewfDefinition;
        }

        const snapshotAutoCellComponent = layoutComponentsMap.get(
          LayoutComponentsNames.SNAPSHOT_AUTO_CELL_RENDERER_BY_TYPE,
        );
        const slottedStyles2Element = getElementBySelectorFromComponent(
          snapshotAutoCellComponent,
          'slottedStyles2',
        );
        const customGridProColumn2Element = getElementBySelectorFromComponent(
          snapshotAutoCellComponent,
          'customGridProColumn2',
        );
        const itemGridProColumn2Elements = getElementsBySelectorFromComponent(
          snapshotAutoCellComponent,
          'itemGridProColumn2',
        );

        slottedStyles2Element.styles = processGridStyles2;
        itemGridProColumn2Elements.forEach(
          (itemGridProColumnElement: any, index: number) => {
            itemGridProColumnElement.definition = customBooleanColDefs[index];
          },
        );
        customGridProColumn2Element.definition = rowRewfDefinition;
      };
      gridLayout.current.addEventListener(
        LayoutEmitEvents.firstLoaded,
        handleGridLayoutFirstLoaded,
      );

      return () => {
        gridLayout.current?.removeEventListener(
          LayoutEmitEvents.firstLoaded,
          handleGridLayoutFirstLoaded,
        );
      };
    }
  }, []);

  return (
    <zero-layout ref={gridLayout}>
      <zero-layout-region type="vertical">
        <zero-layout-region>
          <zero-layout-item title="(stream)" registration="stream" closable>
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
          </zero-layout-item>

          <zero-layout-item
            title="(stream + autoCellRendererByType)"
            registration="stream-auto-cell-renderer-by-type"
            closable
          >
            <zero-grid-pro
              auto-cell-renderer-by-type
              persist-column-state-key="grid-pro-complex-column-state"
              async-add
              enable-row-flashing
              enable-cell-flashing
            >
              <slotted-styles data-selector="slottedStyles"></slotted-styles>
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
              <grid-pro-column data-selector="customGridProColumn">
                <grid-pro-cell></grid-pro-cell>
              </grid-pro-column>
            </zero-grid-pro>
          </zero-layout-item>

          <zero-layout-item
            title="(stream + reverse=true)"
            registration="stream-reverse"
            closable
          >
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
          </zero-layout-item>

          <zero-layout-item
            title="(stream + reverse=true + max-rows=5)"
            registration="stream-reverse-max-rows"
            closable
          >
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
          </zero-layout-item>
        </zero-layout-region>

        <zero-layout-region>
          <zero-layout-item title="(snapshot)" registration="snapshot" closable>
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
          </zero-layout-item>

          <zero-layout-item
            title="(snapshot + autoCellRendererByType)"
            registration="snapshot-auto-cell-renderer-by-type"
            closable
          >
            <zero-grid-pro
              auto-cell-renderer-by-type
              persist-column-state-key="grid-pro-complex-column-state2"
              async-add
              enable-row-flashing
              enable-cell-flashing
            >
              <slotted-styles data-selector="slottedStyles2"></slotted-styles>
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
              <grid-pro-column data-selector="customGridProColumn2">
                <grid-pro-cell></grid-pro-cell>
              </grid-pro-column>
            </zero-grid-pro>
          </zero-layout-item>

          <zero-layout-item
            title="(snapshot + reverse=true)"
            registration="snapshot-reverse"
            closable
          >
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
          </zero-layout-item>

          <zero-layout-item
            title="(snapshot + reverse=true + max-rows=5)"
            registration="snapshot-reverse-max-rows"
            closable
          >
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
          </zero-layout-item>
        </zero-layout-region>
      </zero-layout-region>
    </zero-layout>
  );
};

export default GridProClientDatasourceLayouts;
