import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { css } from '@microsoft/fast-element'
import { DatasourceDefaults } from '@genesislcap/foundation-comms';
import { provideDesignSystem } from '@genesislcap/foundation-zero';
import { zeroGridComponents } from '@genesislcap/foundation-zero-grid-pro';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';

provideDesignSystem().register(zeroGridComponents);

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
  @ViewChild('customGridProCell') customGridProCellElement!: any;
  @ViewChildren('itemGridProColumn') itemGridProColumnElements!: any;
  @ViewChildren('itemGridProCell') itemGridProCellElements!: any;

  maxView = DatasourceDefaults.MAX_VIEW_1000;
  maxRows = DatasourceDefaults.MAX_ROWS_250
  criteria = 'NAME != null';
  processGridStyles = css`
    .process-status {
      color: red;
    }
  `;
  customBooleanColDefs: any = [
    {
      headerName: 'Process Status', // sets custom header for this field
      field: 'PROCESS_STATUS',
      width: 200,
      cellRenderer: null, // disables auto cell renderer for this field
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

    this.itemGridProColumnElements.forEach((itemGridProColumnElement: any, index: number) => {
      itemGridProColumnElement.nativeElement.rendererParams = {}
      itemGridProColumnElement.nativeElement.renderer = this.customBooleanColDefs[index].cellRenderer
    })

    this.customGridProColumnElement.nativeElement.definition = {
      headerName: 'Log Level', // sets custom header for this field
      field: 'LOG_LEVEL',
    };;
    this.customGridProCellElement.nativeElement.renderer = (params: any) => {
      return `<span style="color: ${params.value === 'TRACE' ? params.color : 'green'}">Custom ${
        params.value
      }</span>`;
    };
    this.customGridProCellElement.nativeElement.rendererParams = { color: 'orange' };
  }
}
