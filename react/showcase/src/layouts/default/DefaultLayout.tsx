import React, { ReactNode, useRef, useEffect, useContext } from 'react'
import styles from './DefaultLayout.module.css'
import { layerNames, mainMenu } from '../../config'
import LayerContext from '../../store/LayerContext'
import { useAuth } from '../../store/AuthContext'
import { Flyout } from '@genesislcap/foundation-ui'
import type { Navigation } from '@genesislcap/foundation-header'
import AppFooter from '../../components/AppFooter/AppFooter'
import { useNavigate } from 'react-router-dom'

interface DefaultLayoutProps {
  children: ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { logout } = useAuth()
  const layerContext = useContext(LayerContext)
  const navigate = useNavigate()

  if (!layerContext) {
    throw new Error('LayerContext is not defined')
  }

  const { state, setLayerState } = layerContext
  const isAnyLayerVisible = false
  const foundationHeader = useRef<Navigation>(null)
  const flyoutInbox = useRef<HTMLElement>(null)
  const foundationInbox = useRef<HTMLElement>(null)
  const allRoutes = mainMenu

  useEffect(() => {
    const displayLayerAlertInbox = () =>
      setLayerState(layerNames.alertInbox, true)
    const hideLayerAlertInbox = () =>
      setLayerState(layerNames.alertInbox, false)
    const invokeFlyoutInboxClose = () =>
      (flyoutInbox.current as Flyout).closeFlyout()

    if (foundationHeader?.current) {
      foundationHeader.current.addEventListener(
        'notification-icon-clicked',
        displayLayerAlertInbox,
      )
      foundationHeader.current.logout = () => {
        return logout()
      }
    }

    if (flyoutInbox?.current) {
      flyoutInbox.current.addEventListener('closed', hideLayerAlertInbox)
    }

    if (foundationInbox?.current) {
      foundationInbox.current.addEventListener('close', invokeFlyoutInboxClose)
    }

    return () => {
      if (foundationHeader?.current) {
        foundationHeader.current.removeEventListener(
          'notification-icon-clicked',
          displayLayerAlertInbox,
        )
      }

      if (flyoutInbox?.current) {
        flyoutInbox.current.removeEventListener('closed', hideLayerAlertInbox)
      }

      if (foundationInbox?.current) {
        foundationInbox.current.removeEventListener(
          'close',
          invokeFlyoutInboxClose,
        )
      }
    }
  }, [])

  const className = `${styles['default-layout']} ${
    isAnyLayerVisible ? styles['has-layer'] : ''
  }`

  return (
    <zero-design-system-provider class={className}>
      <foundation-header
        ref={foundationHeader}
        show-luminance-toggle-button
        show-misc-toggle-button
        show-notification-button
      >
        <section className={styles['routes-wrapper']} slot="routes">
          {allRoutes.map((route, index) => (
            <zero-button key={index} onClick={() => navigate(route.path)}>
              <zero-icon name={route.icon}></zero-icon>
              {route.title}
            </zero-button>
          ))}
        </section>
        <div slot="menu-contents">
          <p>GROUP SLOT</p>
          <zero-tree-view slot="nav-items-1">
            <zero-tree-item>
              <zero-icon name="location-arrow"></zero-icon>
              Slot Tree Item
            </zero-tree-item>
            <zero-tree-item>
              <zero-icon name="location-arrow"></zero-icon>
              Slot Tree Item
            </zero-tree-item>
            <zero-tree-item>
              <zero-icon name="location-arrow"></zero-icon>
              Slot Tree Item
            </zero-tree-item>
            <zero-tree-item>
              <zero-icon name="location-arrow"></zero-icon>
              Slot Tree Item
            </zero-tree-item>
          </zero-tree-view>
          <p>GROUP SLOT 2</p>
          <zero-tree-view slot="nav-items-2">
            <zero-tree-item>
              <zero-icon name="location-arrow"></zero-icon>
              Slot Tree Item 2
            </zero-tree-item>
            <zero-tree-item>
              <zero-icon name="location-arrow"></zero-icon>
              Slot Tree Item 2
            </zero-tree-item>
            <zero-tree-item>
              <zero-icon name="location-arrow"></zero-icon>
              Slot Tree Item 2
            </zero-tree-item>
            <zero-tree-item>
              <zero-icon name="location-arrow"></zero-icon>
              Slot Tree Item 2
            </zero-tree-item>
          </zero-tree-view>
          <p>GROUP SLOT 3</p>
          <zero-tree-view slot="nav-items-3">
            <zero-tree-item>
              <zero-icon name="location-arrow"></zero-icon>
              User Slot
            </zero-tree-item>
            <zero-tree-item>
              <zero-icon name="location-arrow"></zero-icon>
              Reporting Slot
            </zero-tree-item>
            <zero-tree-item>
              <zero-icon name="location-arrow"></zero-icon>
              Settings Slot
            </zero-tree-item>
          </zero-tree-view>
        </div>
        <foundation-inbox-counter slot="notifications-icon-end"></foundation-inbox-counter>
      </foundation-header>
      <zero-flyout
        ref={flyoutInbox}
        position="right"
        closed={!state[layerNames.alertInbox] ? 'true' : undefined}
        displayHeader={false}
      >
        <foundation-inbox ref={foundationInbox}></foundation-inbox>
      </zero-flyout>
      {/* <zero-flyout
        position="right"
        onClosed={() => closeLayer(layerNames.alertRules)}
        {...(state[layerNames.alertRules] ? { closed: 'true' } : { closed: 'false' })}
        displayHeader={false}
      >
        <foundation-alerts></foundation-alerts>
      </zero-flyout> */}
      <section className={styles['content']}>{children}</section>
      <AppFooter></AppFooter>
    </zero-design-system-provider>
  )
}

export default DefaultLayout
