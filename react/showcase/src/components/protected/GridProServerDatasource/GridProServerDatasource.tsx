import { useEffect, useContext } from 'react';
import { DatasourceDefaults } from '@genesislcap/foundation-comms';
import StateChangerContext from '../../../store/StateChanger/StateChangerContext';

const GridProServerDatasource = () => {
  const stateChangerContext = useContext(StateChangerContext);
  if (!stateChangerContext) {
    throw new Error('StateChangerContext is not defined');
  }
  const { state: stateChangerState } = stateChangerContext;
  const maxRows = 15;
  const maxView = DatasourceDefaults.MAX_VIEW_1000;
  const reverse = false;
  const pagination = false;

  useEffect(() => {}, []);

  return (
    <section>
      <div className="top-area">
        <p style={{ textAlign: 'center', alignSelf: 'center' }}>
          Infinite Scrolling - VERY EXPERIMENTAL
        </p>
      </div>
      <zero-grid-pro
        style={{ display: 'block', height: '450px' }}
        persist-column-state-key="grid-pro-ssrm-column-state"
      >
        <grid-pro-server-side-datasource
          resource-name={stateChangerState.resourceName}
          criteria={stateChangerState.criteria}
          max-rows={maxRows}
          max-view={maxView}
          reverse={reverse}
          pagination={pagination}
        ></grid-pro-server-side-datasource>
      </zero-grid-pro>
      <div className="top-area">
        <p style={{ textAlign: 'center', alignSelf: 'center' }}>
          Pagination - VERY EXPERIMENTAL
        </p>
      </div>
      <zero-grid-pro
        style={{ display: 'block', height: '450px' }}
        persist-column-state-key="grid-pro-ssrm-column-state"
      >
        <grid-pro-server-side-datasource
          resource-name={stateChangerState.resourceName}
          criteria={stateChangerState.criteria}
          max-rows={maxRows}
          max-view={maxView}
          reverse={reverse}
          pagination={pagination}
        ></grid-pro-server-side-datasource>
      </zero-grid-pro>
    </section>
  );
};

export default GridProServerDatasource;
