import React, { ReactNode, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import reactifyWc from 'reactify-wc';
import {
  baseLayerLuminance,
  StandardLuminance,
} from '@microsoft/fast-components';
import { Flyout } from '@genesislcap/foundation-ui';
import styles from './DefaultLayout.module.css';
import { layerNames, mainMenu } from '../../config';
import LayerContext from '../../store/LayerContext';
import { useAuth } from '../../store/AuthContext';
import AppFooter from '../../components/AppFooter/AppFooter';

const FoundationHeader: any = reactifyWc('foundation-header');
const FoundationInbox: any = reactifyWc('foundation-inbox');
const ZeroFlyout: any = reactifyWc('zero-flyout');
interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { logout } = useAuth();
  const layerContext = useContext(LayerContext);
  const flyoutInbox = useRef<Flyout>(null);
  const navigate = useNavigate();

  if (!layerContext) {
    throw new Error('LayerContext is not defined');
  }

  const { state, setLayerState } = layerContext;
  const isAnyLayerVisible = false;
  const designSystemProvider = useRef<HTMLElement>(null);
  const allRoutes = mainMenu;

  const onLuminanceToogle = (): void => {
    if (designSystemProvider.current) {
      baseLayerLuminance.setValueFor(
        designSystemProvider.current,
        baseLayerLuminance.getValueFor(designSystemProvider.current) ===
          StandardLuminance.DarkMode
          ? StandardLuminance.LightMode
          : StandardLuminance.DarkMode,
      );
    }
  };

  const className = `${styles['default-layout']} ${
    isAnyLayerVisible ? styles['has-layer'] : ''
  }`;

  const handleCloseFlayoutInbox = () => {
    flyoutInbox.current?.closeFlyout();
  };

  return (
    <zero-design-system-provider ref={designSystemProvider} class={className}>
      <FoundationHeader
        logout={logout}
        on-notification-icon-clicked={() =>
          setLayerState(layerNames.alertInbox, true)
        }
        on-luminance-icon-clicked={() => onLuminanceToogle()}
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
      </FoundationHeader>
      <ZeroFlyout
        ref={flyoutInbox}
        on-closed={() => setLayerState(layerNames.alertInbox, false)}
        position="right"
        closed={!state[layerNames.alertInbox] ? 'true' : undefined}
        displayHeader={false}
      >
        <FoundationInbox on-close={handleCloseFlayoutInbox}></FoundationInbox>
      </ZeroFlyout>
      <ZeroFlyout
        on-closed={() => setLayerState(layerNames.alertRules, false)}
        position="right"
        {...(state[layerNames.alertRules]
          ? { closed: 'false' }
          : { closed: 'true' })}
        displayHeader={false}
      >
        <foundation-alerts></foundation-alerts>
      </ZeroFlyout>
      <section className={styles['content']}>{children}</section>
      <AppFooter></AppFooter>
    </zero-design-system-provider>
  );
};

export default DefaultLayout;
