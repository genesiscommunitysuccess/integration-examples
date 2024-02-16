import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasourceDefaults } from '@genesislcap/foundation-comms';
import { STATE_CHANGER_CONFIG } from '../../../config';

@Component({
  selector: 'app-grid-pro-server-datasource',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-pro-server-datasource.component.html',
  styleUrl: './grid-pro-server-datasource.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GridProServerDatasourceComponent {
  @Input() resourceName: string = STATE_CHANGER_CONFIG.DEFAULT_RESOURCE_NAME;
  @Input() criteria: string = STATE_CHANGER_CONFIG.DEFAULT_CRITERIA;

  maxRows = 15;
  maxView = DatasourceDefaults.MAX_VIEW_1000;
  reverse = false;
}
