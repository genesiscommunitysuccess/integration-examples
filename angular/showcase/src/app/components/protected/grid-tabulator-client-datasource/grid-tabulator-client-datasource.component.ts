import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasourceDefaults } from '@genesislcap/foundation-comms';

@Component({
  selector: 'app-grid-tabulator-client-datasource',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-tabulator-client-datasource.component.html',
  styleUrl: './grid-tabulator-client-datasource.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GridTabulatorClientDatasourceComponent {
  @ViewChild('dataSource') dataSourceElement!: any;

  resourceName = 'ALL_COUNTERPARTYS'
  maxView = DatasourceDefaults.MAX_VIEW_1000;
  maxRows = DatasourceDefaults.MAX_ROWS_250
  criteria = 'NAME != null';
  restartOnReconnection = true;
  displayZero = false;
}
