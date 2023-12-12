import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import BaseLayout from '../base.layout';
import { mainMenu } from '../../config';
import { layerNames } from '../../config';
import * as LayersActions from '../../store/layers/layers.actions';
import * as LayersSelectors from '../../store/layers/layers.selectors';
@Component({
  selector: 'default-layout',
  templateUrl: './default.layout.html',
  styleUrls: ['./default.layout.css'],
})
export class DefaultLayout extends BaseLayout implements OnInit, AfterViewInit {
  @ViewChild('foundationHeader') foundationHeaderElement!: ElementRef;
  allRoutes = mainMenu;
  layerNames = layerNames;
  layerStateAlertInbox$: Observable<boolean>;
  layerStateAlertRules$: Observable<boolean>;
  layerStateAlertRules: boolean = false;
  isAnyLayerVisible$: Observable<boolean>;
  isAnyLayerVisible: boolean = false;

  private subscription: Subscription = new Subscription();

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

  ngAfterViewInit() {
    this.foundationHeaderElement.nativeElement.navigateTo = (path: string) => {
      this.router.navigate([path]);
    };
  }

  onNotificationIconClicked() {
    this.store.dispatch(LayersActions.showLayer({ layerName: layerNames.alertInbox }));
  }

  closeLayer(layerName: string) {
    this.store.dispatch(LayersActions.hideLayer({ layerName }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
