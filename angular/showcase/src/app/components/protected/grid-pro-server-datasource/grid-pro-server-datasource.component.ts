import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasourceDefaults } from '@genesislcap/foundation-comms';

@Component({
  selector: 'app-grid-pro-server-datasource',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-pro-server-datasource.component.html',
  styleUrl: './grid-pro-server-datasource.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GridProServerDatasourceComponent {
  criteria?: string = 'NAME != null';
  maxRows = 15;
  maxView = DatasourceDefaults.MAX_VIEW_1000;
  resourceName = 'ALL_COUNTERPARTYS'
  reverse = false;
  pagination = false;
}
