import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { css } from '@microsoft/fast-element'
import { DatasourceDefaults } from '@genesislcap/foundation-comms';

@Component({
  selector: 'app-grid-pro-client-datasource',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-pro-client-datasource.component.html',
  styleUrl: './grid-pro-client-datasource.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GridProClientDatasourceComponent implements AfterViewInit {
  @ViewChild('customGridProColumn') customGridProColumnElement!: any;
  @ViewChild('slottedStyles') slottedStylesElement!: any;
  @ViewChild('customGridProCell') customGridProCellElement!: any;
  @ViewChildren('itemGridProColumn') itemGridProColumnElements!: any;
  @ViewChildren('itemGridProCell') itemGridProCellElements!: any;

  @ViewChild('customGridProColumn2') customGridProColumn2Element!: any;
  @ViewChild('slottedStyles2') slottedStyles2Element!: any;
  @ViewChild('customGridProCell2') customGridProCell2Element!: any;
  @ViewChildren('itemGridProColumn2') itemGridProColumn2Elements!: any;
  @ViewChildren('itemGridProCell2') itemGridProCell2Elements!: any;

  maxView = DatasourceDefaults.MAX_VIEW_1000;
  maxRows = DatasourceDefaults.MAX_ROWS_250
  criteria = 'NAME != null';
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
  }
  customBooleanColDefs: any = [
    {
      headerName: 'Process Status', // sets custom header for this field
      field: 'PROCESS_STATUS',
      width: 200,
      cellRenderer: ({ data }: any) => {
        return `<span class="process-status-${!!data.ENABLED ? 'enabled' : 'disabled'}">Custom ${
          !!data.ENABLED ? 'Enabled' : 'Disabled'
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

  ngAfterViewInit() {
    this.itemGridProColumnElements.forEach((itemGridProColumnElement: any, index: number) => {
      itemGridProColumnElement.nativeElement.definition = this.customBooleanColDefs[index];
    });

    this.slottedStylesElement.nativeElement.styles = this.processGridStyles;

    this.customGridProColumnElement.nativeElement.definition = this.rowRewfDefinition;

    this.itemGridProColumn2Elements.forEach((itemGridProColumnElement: any, index: number) => {
      itemGridProColumnElement.nativeElement.definition = this.customBooleanColDefs[index];
    });

    this.slottedStyles2Element.nativeElement.styles = this.processGridStyles;

    this.customGridProColumn2Element.nativeElement.definition = this.rowRewfDefinition;

    this.customGridProCell2Element.nativeElement.renderer = (params: any) => {
      return `<span style="color: ${params.value === 'TRACE' ? 'orange': 'green'}">Custom ${
        params.value
      }</span>`;
    };
  }
}
