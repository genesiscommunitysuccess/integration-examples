import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideDesignSystem } from '@genesislcap/foundation-zero';
import { zeroGridComponents } from '@genesislcap/foundation-zero-grid-pro';
import { foundationGridComponents } from '@genesislcap/grid-pro';

import { GridProClientDatasourceComponent } from '../../components/protected/grid-pro-client-datasource/grid-pro-client-datasource.component';
import { GridProClientDatasourceLayoutsComponent } from '../../components/protected/grid-pro-client-datasource-layouts/grid-pro-client-datasource-layouts.component';
import { GridProClientDatasourceLinkedComponent } from '../../components/protected/grid-pro-client-datasource-linked/grid-pro-client-datasource-linked.component';
import { GridProServerDatasourceComponent } from '../../components/protected/grid-pro-server-datasource/grid-pro-server-datasource.component';
import { GridTabulatorClientDatasourceComponent } from '../../components/protected/grid-tabulator-client-datasource/grid-tabulator-client-datasource.component';
import { SlottedStyles } from '@genesislcap/foundation-utils'

SlottedStyles;

provideDesignSystem().register(zeroGridComponents, foundationGridComponents);

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [ GridProClientDatasourceComponent, GridProClientDatasourceLayoutsComponent, GridProClientDatasourceLinkedComponent, GridProServerDatasourceComponent, GridTabulatorClientDatasourceComponent ],
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProtectedComponent {}
