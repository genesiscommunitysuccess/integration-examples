import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
  ViewChildren,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { css } from '@microsoft/fast-element';
import { DatasourceDefaults } from '@genesislcap/foundation-comms';
import { LayoutEmitEvents } from '@genesislcap/foundation-layout';
import { LayoutComponentsNames } from './grid-pro-client-datasource-layouts.types';
import {
  setComponentItemsMap,
  getElementBySelectorFromComponent,
  getElementsBySelectorFromComponent,
} from '../../../utils/goldenLayout.helper';

@Component({
  selector: 'app-grid-pro-client-datasource-layouts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-pro-client-datasource-layouts.component.html',
  styleUrl: './grid-pro-client-datasource-layouts.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GridProClientDatasourceLayoutsComponent implements AfterViewInit {
  @ViewChild('gridLayout') gridLayoutElement!: any;
  @ViewChild('customGridProColumn') customGridProColumnElement!: any;
  @ViewChildren('itemGridProCell') itemGridProCellElements!: any;

  @ViewChild('customGridProColumn2') customGridProColumn2Element!: any;
  @ViewChild('slottedStyles2') slottedStyles2Element!: any;

  layoutComponentsMap: Map<LayoutComponentsNames, any> = new Map();

  maxView = DatasourceDefaults.MAX_VIEW_1000;
  maxRows = DatasourceDefaults.MAX_ROWS_250;
  criteria = 'NAME != null';
  processGridStyles = css`
    .process-status-enabled {
      color: green;
    }
    .process-status-disabled {
      color: red;
    }
  `;
  processGridStyles2 = css`
    .process-status-enabled {
      color: lightblue;
    }
    .process-status-disabled {
      color: yellow;
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
    setComponentItemsMap(this.gridLayoutElement.nativeElement, this.layoutComponentsMap);

    this.gridLayoutElement.nativeElement.addEventListener(LayoutEmitEvents.firstLoaded, () => {
      const streamAutoCellComponent = this.layoutComponentsMap.get(
        LayoutComponentsNames.STREAM_AUTO_CELL_RENDERER_BY_TYPE,
      );
      const slottedStylesElement = getElementBySelectorFromComponent(
        streamAutoCellComponent,
        'slottedStyles',
      );
      const itemGridProColumnElements = getElementsBySelectorFromComponent(
        streamAutoCellComponent,
        'itemGridProColumn',
      );
      const customGridProColumnElement = getElementBySelectorFromComponent(
        streamAutoCellComponent,
        'customGridProColumn',
      );

      const snapshotAutoCellComponent = this.layoutComponentsMap.get(
        LayoutComponentsNames.SNAPSHOT_AUTO_CELL_RENDERER_BY_TYPE,
      );
      const slottedStyles2Element = getElementBySelectorFromComponent(
        snapshotAutoCellComponent,
        'slottedStyles2',
      );
      const customGridProColumn2Element = getElementBySelectorFromComponent(
        snapshotAutoCellComponent,
        'customGridProColumn2',
      );
      const itemGridProColumn2Elements = getElementsBySelectorFromComponent(
        snapshotAutoCellComponent,
        'itemGridProColumn2',
      );

      slottedStylesElement.styles = this.processGridStyles;
      itemGridProColumnElements.forEach((itemGridProColumnElement: any, index: number) => {
        itemGridProColumnElement.definition = this.customBooleanColDefs[index];
      });
      customGridProColumnElement.definition = this.rowRewfDefinition;

      slottedStyles2Element.styles = this.processGridStyles2;
      itemGridProColumn2Elements.forEach((itemGridProColumnElement: any, index: number) => {
        itemGridProColumnElement.definition = this.customBooleanColDefs[index];
      });
      customGridProColumn2Element.definition = this.rowRewfDefinition;
    });
  }
}
