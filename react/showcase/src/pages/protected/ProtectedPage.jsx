import './ProtectedPage.css';
import GridProClientDatasource from '../../components/protected/GridProClientDatasource/GridProClientDatasource';

const ProtectedPage = () => {
  return (
    <div className="protected-page">
      <div className="resource-filter">
          <state-changer></state-changer>
      </div>
      <zero-tabs appearance="secondary">
          <zero-tab appearance="secondary" slot="tab">Grid Pro + Client Datasource</zero-tab>
          <zero-tab appearance="secondary" slot="tab">Grid Pro + Client Datasource + Layouts</zero-tab>
          <zero-tab appearance="secondary" slot="tab">Grid Pro + Client Datasource + Linked</zero-tab>
          <zero-tab appearance="secondary" slot="tab">Grid Pro + Server Datasource</zero-tab>
          <zero-tab appearance="secondary" slot="tab">Grid Tabulator + Client Datasource</zero-tab>

          <zero-tab-panel slot="tabpanel">
          <zero-notification-listener><GridProClientDatasource /></zero-notification-listener>
          </zero-tab-panel>

          <zero-tab-panel slot="tabpanel">
          {/* <zero-notification-listener>${gridProClientDatasourceAndLayout}</zero-notification-listener> */}
          </zero-tab-panel>

          <zero-tab-panel slot="tabpanel">
          {/* <zero-notification-listener>${gridProClientDatasourceAndEvents}</zero-notification-listener> */}
          </zero-tab-panel>

          <zero-tab-panel slot="tabpanel">
          {/* <zero-notification-listener>${gridProServerDatasource}</zero-notification-listener> */}
          </zero-tab-panel>

          <zero-tab-panel slot="tabpanel">
          {/* <zero-notification-listener>${gridTabulatorClientDatasource}</zero-notification-listener> */}
          </zero-tab-panel>
      </zero-tabs>
    </div>
  );
};

export default ProtectedPage;
