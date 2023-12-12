import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as StateChangerSelector from '../../store/state-changer/state-changer.selectors';
import { StateChangerComponent } from '../../components/protected/state-changer/state-changer.component';
import { GridProClientDatasourceComponent } from '../../components/protected/grid-pro-client-datasource/grid-pro-client-datasource.component';
import { GridProClientDatasourceLayoutsComponent } from '../../components/protected/grid-pro-client-datasource-layouts/grid-pro-client-datasource-layouts.component';
import { GridProClientDatasourceLinkedComponent } from '../../components/protected/grid-pro-client-datasource-linked/grid-pro-client-datasource-linked.component';
import { GridProServerDatasourceComponent } from '../../components/protected/grid-pro-server-datasource/grid-pro-server-datasource.component';
import { GridTabulatorClientDatasourceComponent } from '../../components/protected/grid-tabulator-client-datasource/grid-tabulator-client-datasource.component';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [
    CommonModule,
    StateChangerComponent,
    GridProClientDatasourceComponent,
    GridProClientDatasourceLayoutsComponent,
    GridProClientDatasourceLinkedComponent,
    GridProServerDatasourceComponent,
    GridTabulatorClientDatasourceComponent,
  ],
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProtectedComponent implements OnInit, OnDestroy {
  @ViewChild('zeroTabs') zeroTabsElement!: any;

  criteria$: Observable<string> = this.store.select(StateChangerSelector.getCriteria);
  resourceName$: Observable<string> = this.store.select(StateChangerSelector.getResourceName);
  criteria: string = '';
  resourceName: string = '';
  private subscription: Subscription = new Subscription();
  displayStateChanger = true;

  constructor(private store: Store) {
    this.criteria$ = this.store.pipe(select(StateChangerSelector.getCriteria));
    this.resourceName$ = this.store.pipe(select(StateChangerSelector.getResourceName));
  }

  ngOnInit() {
    this.subscription.add(
      this.criteria$.subscribe((value) => {
        this.criteria = value;
      }),
    );

    this.subscription.add(
      this.resourceName$.subscribe((value) => {
        this.resourceName = value;
      }),
    );
  }

  onTabChanged({ detail }: any) {
    this.displayStateChanger = !Object.prototype.hasOwnProperty.call(detail.attributes, 'hide-state-changer');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
