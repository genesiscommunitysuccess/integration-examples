import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SlottedStyles } from '@genesislcap/foundation-utils';
import { ModuleRegistry } from '@ag-grid-community/core';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { StoreService, DEFAULT_CRITERIA, DEFAULT_RESOURCE_NAME } from '../../services/store.service';
import { StateChangerComponent } from '../../components/protected/state-changer/state-changer.component';
import { GridProClientDatasourceComponent } from '../../components/protected/grid-pro-client-datasource/grid-pro-client-datasource.component';
import { GridProClientDatasourceLayoutsComponent } from '../../components/protected/grid-pro-client-datasource-layouts/grid-pro-client-datasource-layouts.component';
import { GridProClientDatasourceLinkedComponent } from '../../components/protected/grid-pro-client-datasource-linked/grid-pro-client-datasource-linked.component';
import { GridProServerDatasourceComponent } from '../../components/protected/grid-pro-server-datasource/grid-pro-server-datasource.component';
import { GridTabulatorClientDatasourceComponent } from '../../components/protected/grid-tabulator-client-datasource/grid-tabulator-client-datasource.component';

SlottedStyles;
ModuleRegistry.registerModules([RowGroupingModule, ServerSideRowModelModule]);

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
export class ProtectedComponent implements OnInit {
  @ViewChild('zeroTabs') zeroTabsElement!: any;

  criteria: string = DEFAULT_CRITERIA;
  resourceName: string = DEFAULT_RESOURCE_NAME;
  private subscriptions: Subscription[] = [];
  displayStateChanger = true;

  constructor(private store: StoreService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.store.getCriteria().subscribe((newCriteria) => {
        this.criteria = newCriteria;
      }),
      this.store.getResourceName().subscribe((newResourceName) => {
        this.resourceName = newResourceName;
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe()
    });
  }

  onTabChanged({ detail }: any) {
    this.displayStateChanger = !detail.attributes.hasOwnProperty('hide-state-changer')
  }
}
