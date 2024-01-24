import { useState } from 'react';
import reactifyWc from 'reactify-wc';
import styles from './ProtectedPage.module.css';
import StateChanger from '../../components/protected/StateChanger/StateChanger';
import GridProClientDatasource from '../../components/protected/GridProClientDatasource/GridProClientDatasource';
import GridProClientDatasourceLayouts from '../../components/protected/GridProClientDatasourceLayouts/GridProClientDatasourceLayouts';
import GridProClientDatasourceLinked from '../../components/protected/GridProClientDatasourceLinked/GridProClientDatasourceLinked';
import GridProServerDatasource from '../../components/protected/GridProServerDatasource/GridProServerDatasource';
import GridTabulatorClientDatasource from '../../components/protected/GridTabulatorClientDatasource/GridTabulatorClientDatasource';

const ZeroTabs: any= reactifyWc('zero-tabs');

const ProtectedPage = () => {
  const [displayStateChanger, setDisplayStateChanger] = useState(true);

  const handleTabSelected = (e: CustomEvent) => {
    setDisplayStateChanger(
      !Object.prototype.hasOwnProperty.call(
        e.detail.attributes,
        'hide-state-changer',
      ),
    );
  };

  return (
    <div className={styles['protected-page']}>
      <div className={styles['resource-filter']}>
        {displayStateChanger && <StateChanger></StateChanger>}
      </div>
      <ZeroTabs appearance="secondary" on-change={handleTabSelected}>
        <zero-tab appearance="secondary" slot="tab">
          Grid Pro + Client Datasource
        </zero-tab>
        <zero-tab appearance="secondary" slot="tab">
          Grid Pro + Client Datasource + Layouts
        </zero-tab>
        <zero-tab appearance="secondary" slot="tab" hide-state-changer>
          Grid Pro + Client Datasource + Linked
        </zero-tab>
        <zero-tab appearance="secondary" slot="tab">
          Grid Pro + Server Datasource
        </zero-tab>
        <zero-tab appearance="secondary" slot="tab">
          Grid Tabulator + Client Datasource
        </zero-tab>

        <zero-tab-panel slot="tabpanel">
          <zero-notification-listener>
            <GridProClientDatasource />
          </zero-notification-listener>
        </zero-tab-panel>

        <zero-tab-panel slot="tabpanel">
          <zero-notification-listener>
            <GridProClientDatasourceLayouts />
          </zero-notification-listener>
        </zero-tab-panel>

        <zero-tab-panel slot="tabpanel">
          <zero-notification-listener>
            <GridProClientDatasourceLinked />
          </zero-notification-listener>
        </zero-tab-panel>

        <zero-tab-panel slot="tabpanel">
          <zero-notification-listener>
            <GridProServerDatasource />
          </zero-notification-listener>
        </zero-tab-panel>

        <zero-tab-panel slot="tabpanel">
          <zero-notification-listener>
            <GridTabulatorClientDatasource />
          </zero-notification-listener>
        </zero-tab-panel>
      </ZeroTabs>
    </div>
  );
};

export default ProtectedPage;
