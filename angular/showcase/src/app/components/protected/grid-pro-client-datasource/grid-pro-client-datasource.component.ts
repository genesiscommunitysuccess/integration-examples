import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
  ViewChildren,
  AfterViewInit,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { css } from '@microsoft/fast-element';
import { DatasourceDefaults } from '@genesislcap/foundation-comms';
import { STATE_CHANGER_CONFIG } from '../../../config';

@Component({
  selector: 'app-grid-pro-client-datasource',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-pro-client-datasource.component.html',
  styleUrl: './grid-pro-client-datasource.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GridProClientDatasourceComponent {
  @Input() resourceName: string = STATE_CHANGER_CONFIG.DEFAULT_RESOURCE_NAME;
  @Input() criteria: string = STATE_CHANGER_CONFIG.DEFAULT_CRITERIA;

  maxView = DatasourceDefaults.MAX_VIEW_1000;
  maxRows = DatasourceDefaults.MAX_ROWS_250;

  processGridStyles = css`
    .process-status-enabled {
      color: green;
    }
    .process-status-disabled {
      color: red;
    }
  `;
  rowRewfDefinition = {
    headerName: 'Row ref',
    field: 'ROW_REF',
    cellRenderer: ({ data }: any) => {
      return `<span style="color:#555">${data.ROW_REF}</span>`;
    },
  };
  customBooleanColDefs: any = [
    {
      headerName: 'Process Status', // sets custom header for this field
      field: 'PROCESS_STATUS',
      width: 200,
      cellRenderer: ({ data }: any) => {
        return `<span class="process-status-${data.ENABLED ? 'enabled' : 'disabled'}">Custom ${
          data.ENABLED ? 'Enabled' : 'Disabled'
        }</span>`;
      }, // custom renderer for this field
      cellClass: 'process-status',
    },
    {
      headerName: 'Process SUPER SECURE', // sets custom header for this field
      field: 'PROCESS_SECURE',
      width: 100,
      cellRenderer: 'boolean',
    },
  ];
  customGridProCellRenderer = (params: any) => {
    console.log('MOJE PARAMSIDŁA', params);
    return `<span style="color: ${params.value === 'TRACE' ? 'orange' : 'green'}">Custom ${
      params.value
    }</span>`;
  }
  customGridProCellRendererParams = { color: 'orange' }
}