import { useRef, useEffect } from 'react';
import reactifyWc from 'reactify-wc';
import { GridOptions, RowSelectedEvent } from '@ag-grid-community/core';
import {
  LayoutEmitEvents,
  FoundationLayout,
} from '@genesislcap/foundation-layout';
import { LayoutComponentsNames } from './GridProClientDatasourceLinked.types';
import {
  setComponentItemsMap,
  getElementByTagFromComponent,
} from '../../../utils/goldenLayout.helper';

const ZeroLayout: any = reactifyWc('zero-layout');

const DATASOURCE_ELEMENT_TAG = 'grid-pro-genesis-datasource';

const GridProClientDatasourceLinked = () => {
  const layoutComponentsMap: Map<LayoutComponentsNames, any> = new Map();
  const deferredGridOptions: GridOptions = {
    rowSelection: 'single',
    onRowClicked: (e: RowSelectedEvent) => {
      const instrumentName = e.node.isSelected()
        ? e.data?.INSTRUMENT_NAME
        : undefined;
      if (instrumentName) {
        const allTradesComponent = layoutComponentsMap.get(
          LayoutComponentsNames.ALL_TRADES,
        );
        const datasourceElement = getElementByTagFromComponent(
          allTradesComponent,
          DATASOURCE_ELEMENT_TAG,
        );
        datasourceElement.criteria = `INSTRUMENT_NAME == '${instrumentName}'`;
      }
    },
  };
  const gridLayout = useRef<FoundationLayout | null>(null);

  const handleGridLayoutFirstLoaded = () => {
    const allPositions = layoutComponentsMap.get(
      LayoutComponentsNames.ALL_POSITIONS,
    );
    const datasourceElement = getElementByTagFromComponent(
      allPositions,
      DATASOURCE_ELEMENT_TAG,
    );

    datasourceElement.deferredGridOptions = deferredGridOptions;
  };

  const layoutEvents = {
    [`on-${LayoutEmitEvents.firstLoaded}`]: handleGridLayoutFirstLoaded,
  };

  useEffect(() => {
    if (gridLayout.current) {
      setComponentItemsMap(gridLayout.current, layoutComponentsMap);
    }
  }, []);

  return (
    <ZeroLayout {...layoutEvents} ref={gridLayout}>
      <zero-layout-region type="horizontal">
        <zero-layout-region>
          <zero-layout-item
            title="(ALL_POSITIONS)"
            registration="all-positions"
          >
            <zero-grid-pro>
              <grid-pro-genesis-datasource resource-name="ALL_POSITIONS"></grid-pro-genesis-datasource>
            </zero-grid-pro>
          </zero-layout-item>
        </zero-layout-region>
        <zero-layout-region>
          <zero-layout-item title="(ALL_TRADES)" registration="all-trades">
            <zero-grid-pro>
              <grid-pro-genesis-datasource resource-name="ALL_TRADES"></grid-pro-genesis-datasource>
            </zero-grid-pro>
          </zero-layout-item>
        </zero-layout-region>
      </zero-layout-region>
    </ZeroLayout>
  );
};

export default GridProClientDatasourceLinked;
