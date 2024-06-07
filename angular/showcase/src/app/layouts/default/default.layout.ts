import { Component, ViewChild, ElementRef, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { baseLayerLuminance, StandardLuminance } from '@microsoft/fast-components';
import { configureDesignSystem } from '@genesislcap/foundation-ui';
import BaseLayout from '../base.layout';
import { mainMenu } from '../../config';
import { layerNames } from '../../config';
import * as LayersActions from '../../store/layers/layers.actions';
import * as LayersSelectors from '../../store/layers/layers.selectors';
import * as designTokens from '../../../styles/design-tokens.json';
@Component({
  selector: 'app-default-layout',
  templateUrl: './default.layout.html',
  styleUrls: ['./default.layout.css'],
})
export class DefaultLayoutComponent extends BaseLayout implements OnInit, OnDestroy, AfterViewInit{
  @ViewChild('designSystemProvider') designSystemProviderElement!: ElementRef;
  allRoutes = mainMenu;
  layerNames = layerNames;
  layerStateAlertInbox$: Observable<boolean>;
  layerStateAlertRules$: Observable<boolean>;
  layerStateAlertRules: boolean = false;
  isAnyLayerVisible$: Observable<boolean>;
  isAnyLayerVisible: boolean = false;
  private subscription: Subscription = new Subscription();
  private eventListenersRemovers: Array<() => void> = [];

  constructor(
    router: Router,
    private store: Store,
  ) {
    super(router);

    this.layerStateAlertRules$ = this.store.pipe(
      select(LayersSelectors.isLayerVisible(layerNames.alertRules)),
    );
    this.layerStateAlertInbox$ = this.store.pipe(
      select(LayersSelectors.isLayerVisible(layerNames.alertInbox)),
    );
    this.isAnyLayerVisible$ = this.store.pipe(select(LayersSelectors.isAnyLayerVisible));
  }

  ngAfterViewInit() {
    configureDesignSystem(this.designSystemProviderElement.nativeElement, designTokens);
  }
  
  navigateAngular = (path: string) => {
    this.router.navigate([path]);
  };

  ngOnInit() {
    this.subscription.add(
      this.layerStateAlertRules$.subscribe((value) => {
        this.layerStateAlertRules = value;
      }),
    );

    this.subscription.add(
      this.isAnyLayerVisible$.subscribe((value) => {
        this.isAnyLayerVisible = value;
      }),
    );
  }

  onNotificationIconClicked() {
    this.store.dispatch(LayersActions.showLayer({ layerName: layerNames.alertInbox }));
  }
  
  onLuminanceToogle = (): void => {
    baseLayerLuminance.setValueFor(
      this.designSystemProviderElement.nativeElement,
      baseLayerLuminance.getValueFor(this.designSystemProviderElement.nativeElement) ===
        StandardLuminance.DarkMode
        ? StandardLuminance.LightMode
        : StandardLuminance.DarkMode,
    );
  };

  closeLayer(layerName: string) {
    this.store.dispatch(LayersActions.hideLayer({ layerName }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.eventListenersRemovers.forEach((remover) => remover());
  }
}
