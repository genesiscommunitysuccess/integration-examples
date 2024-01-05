import { useRef, useEffect, useState } from 'react'
import style from './AdminPage.module.css'
import { FoundationLayout } from '@genesislcap/foundation-layout'
import {
  UsersColumnConfig,
  Users,
} from '@genesislcap/foundation-entity-management'

const AdminPage = () => {
  const userButton = useRef<HTMLButtonElement>(null)
  const profileButton = useRef<HTMLButtonElement>(null)
  const counterpartyButton = useRef<HTMLButtonElement>(null)
  const readButton = useRef<HTMLButtonElement>(null)
  const adminLayout = useRef<FoundationLayout>(null)
  const userManagment = useRef<Users>(null)
  const userManagment2 = useRef<Users>(null)
  const entityManagement = useRef<HTMLElement>(null)
  const [layoutPaneCount, setLayoutPaneCount] = useState(0)
  const userColumns = [
    ...UsersColumnConfig,
    {
      field: 'ACCESS_TYPE',
      headerName: 'Access Type',
    },
  ]
  const handleAddItem = (registration: string) => {
    if (adminLayout.current) {
      setLayoutPaneCount(() => layoutPaneCount + 1)
      adminLayout.current.addItem({
        registration,
        title: `${registration} (${layoutPaneCount})`,
        closable: true,
      })
    }
  }

  useEffect(() => {
    const handleAddItemUser = handleAddItem.bind(null, 'user')
    const handleAddItemProfile = handleAddItem.bind(null, 'profile')
    const handleAddItemCounterparty = handleAddItem.bind(null, 'counterparty')
    const handleReadEntity = () => {
      const event = new CustomEvent('read-entity')
      if (entityManagement.current) {
        entityManagement.current.dispatchEvent(event)
      }
    }

    if (userButton.current) {
      userButton.current.addEventListener('click', handleAddItemUser)
    }

    if (profileButton.current) {
      profileButton.current.addEventListener('click', handleAddItemProfile)
    }

    if (counterpartyButton.current) {
      counterpartyButton.current.addEventListener(
        'click',
        handleAddItemCounterparty,
      )
    }

    if (userManagment.current) {
      userManagment.current.columns = userColumns
    }

    if (userManagment2.current) {
      userManagment2.current.columns = userColumns
    }

    if (readButton.current) {
      readButton.current.addEventListener('click', handleReadEntity)
    }

    return () => {
      if (userButton.current) {
        userButton.current.removeEventListener('click', handleAddItemUser)
      }
      if (profileButton.current) {
        profileButton.current.removeEventListener('click', handleAddItemProfile)
      }
      if (counterpartyButton.current) {
        counterpartyButton.current.removeEventListener(
          'click',
          handleAddItemCounterparty,
        )
      }
      if (readButton.current) {
        readButton.current.removeEventListener('click', handleReadEntity)
      }
    }
  }, [])
  return (
    <div className={style['admin-page']}>
      <zero-tabs>
        <span slot="start">Admin</span>
        <zero-tab slot="tab">Split</zero-tab>
        <zero-tab slot="tab">Users</zero-tab>
        <zero-tab slot="tab">Profiles</zero-tab>
        <zero-tab slot="tab">Counterparties</zero-tab>
        <zero-tab-panel slot="tabpanel">
          <zero-notification-listener>
            <nav>
              <zero-button ref={userButton}>User Management</zero-button>
              <zero-button ref={profileButton}>Profile Management</zero-button>
              <zero-button ref={counterpartyButton}>
                Counterparty Management
              </zero-button>
            </nav>
            <zero-layout ref={adminLayout} popout-config="960;720">
              <zero-layout-region>
                <zero-layout-item
                  title="User Management"
                  registration="user"
                  closable
                >
                  <user-management ref={userManagment}></user-management>
                </zero-layout-item>
                <zero-layout-region type="vertical">
                  <zero-layout-item
                    title="Profile Management"
                    registration="profile"
                    closable
                  >
                    <profile-management></profile-management>
                  </zero-layout-item>
                  <zero-layout-item
                    title="Counterparty Management"
                    registration="counterparty"
                    closable
                  >
                    <entity-management
                      resourceName="ALL_COUNTERPARTYS"
                      title="Counterparty Management"
                      updateEvent="EVENT_COUNTERPARTY_MODIFY"
                      deleteEvent="EVENT_COUNTERPARTY_DELETE"
                      createEvent="EVENT_COUNTERPARTY_INSERT"
                      enable-filter-bar
                    ></entity-management>
                  </zero-layout-item>
                </zero-layout-region>
              </zero-layout-region>
            </zero-layout>
          </zero-notification-listener>
        </zero-tab-panel>
        <zero-tab-panel slot="tabpanel">
          <zero-notification-listener>
            <user-management ref={userManagment2}></user-management>
          </zero-notification-listener>
        </zero-tab-panel>
        <zero-tab-panel slot="tabpanel">
          <zero-notification-listener>
            <profile-management></profile-management>
          </zero-notification-listener>
        </zero-tab-panel>
        <zero-tab-panel slot="tabpanel">
          <zero-button ref={readButton}>Read Entity</zero-button>
          <entity-management
            ref={entityManagement}
            class="entity-management-counterpartys"
            resourceName="ALL_COUNTERPARTYS"
            title="Counterparty Management"
            updateEvent="EVENT_COUNTERPARTY_MODIFY"
            deleteEvent="EVENT_COUNTERPARTY_DELETE"
            createEvent="EVENT_COUNTERPARTY_INSERT"
          ></entity-management>
        </zero-tab-panel>
      </zero-tabs>
    </div>
  )
}

export default AdminPage
