import React, { ReactNode, useRef, useEffect, useContext } from 'react';
import { layerNames, mainMenu } from '../../config';
import LayerContext from '../../store/LayerContext';
import './DefaultLayout.css';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const context = useContext(LayerContext);
  const isAnyLayerVisible = false;
  const foundationHeader = useRef<HTMLElement>(null);
  const allRoutes = mainMenu;
  const layerStateAlertRules = false

  useEffect(() => {
    if (foundationHeader?.current) {
      foundationHeader.current.addEventListener('notification-icon-clicked', () => {
        onNotificationIconClicked();
      });

    }
  }, []);

  const onNotificationIconClicked = () => {
    if (context?.setLayerState && context?.state) {
      context.setLayerState(layerNames.alertInbox, true);
      console.log({state: context.state})
    }
  }

  const navigate = (path: string) => {
    console.log('navigate', path);
    //this.router.navigate([path]);
  }

  const closeLayer = (layerName: string) => {
    console.log('closeLayer', layerName);
    //this.store.dispatch(LayersActions.hideLayer({ layerName }));
  }

  return (
    <zero-design-system-provider className={`${isAnyLayerVisible && 'has-layer'}`}>
      <foundation-header
        ref={foundationHeader}
        show-luminance-toggle-button
        show-misc-toggle-button
        show-notification-button
      >
        <section className="routes-wrapper" slot="routes">
          {allRoutes.map((route, index) => (
            <zero-button key={index} onClick={() => navigate(route.path)}>
              <zero-icon name={route.icon }></zero-icon>
              { route.title }
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
        position="right"
        onClosed={() => closeLayer(layerNames.alertInbox)}
        closed={!(context?.state[layerNames.alertInbox])}
        displayHeader={false}
      >
        <foundation-inbox onClose={() => closeLayer(layerNames.alertInbox)}></foundation-inbox>
      </zero-flyout>
      <zero-flyout
        position="right"
        onClosed={() => closeLayer(layerNames.alertRules)}
        closed={!layerStateAlertRules}
        displayHeader={false}
      >
        <foundation-alerts></foundation-alerts>
      </zero-flyout>
      <section className="content">
        {children}
      </section>
      <app-footer />
    </zero-design-system-provider>
)};

export default DefaultLayout;
