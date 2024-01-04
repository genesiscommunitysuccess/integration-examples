import styles from './ProtectedPage.module.css'
import GridProClientDatasource from '../../components/protected/GridProClientDatasource/GridProClientDatasource'
import GridProClientDatasourceLayouts from '../../components/protected/GridProClientDatasourceLayouts/GridProClientDatasourceLayouts'

const ProtectedPage = () => {
  return (
    <div className={styles['protected-page']}>
      <div className={styles['resource-filter']}>
        <state-changer></state-changer>
      </div>
      <zero-tabs appearance="secondary">
        <zero-tab appearance="secondary" slot="tab">
          Grid Pro + Client Datasource
        </zero-tab>
        <zero-tab appearance="secondary" slot="tab">
          Grid Pro + Client Datasource + Layouts
        </zero-tab>
        <zero-tab appearance="secondary" slot="tab">
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
  )
}

export default ProtectedPage
