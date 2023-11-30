import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { GridOptions, RowSelectedEvent } from '@ag-grid-community/core';
import { CommonModule } from '@angular/common';
import { LayoutEmitEvents } from '@genesislcap/foundation-layout';
import {
  LayoutComponentsNames,
} from './grid-pro-client-datasource-linked.types';
import {
  setComponentItemsMap,
  getElementByTagFromComponent,
} from '../../../utils/goldenLayout.helper';

const DATASOURCE_ELEMENT_TAG = 'grid-pro-genesis-datasource'

@Component({
  selector: 'app-grid-pro-client-datasource-linked',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-pro-client-datasource-linked.component.html',
  styleUrl: './grid-pro-client-datasource-linked.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GridProClientDatasourceLinkedComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gridLayout') gridLayoutElement!: any;

  layoutComponentsMap: Map<LayoutComponentsNames, any> = new Map();
  deferredGridOptions: GridOptions = {
    rowSelection: 'single',
    onRowClicked: (e: RowSelectedEvent) => {
      console.log({instrumentName: e.node.isSelected() ? e.data?.INSTRUMENT_NAME : undefined})
      this.instrumentName = e.node.isSelected() ? e.data?.INSTRUMENT_NAME : undefined;
    },
  };
  criteria?: string;
  private _instrumentName: any;
  set instrumentName(value: any) {
    this._instrumentName = value;

    const criteria = value ? `INSTRUMENT_NAME == '${value}'` : undefined;
    const allTradesComponent = this.layoutComponentsMap.get(LayoutComponentsNames.ALL_TRADES);
    const datasourceElement = getElementByTagFromComponent(allTradesComponent, DATASOURCE_ELEMENT_TAG);
    datasourceElement.criteria = criteria;
  }
  get instrumentName(): any {
    return this._instrumentName;
  }

  setDeferredGridOptions = () => {
    const allPositions = this.layoutComponentsMap.get(LayoutComponentsNames.ALL_POSITIONS);
    const datasourceElement = getElementByTagFromComponent(allPositions, DATASOURCE_ELEMENT_TAG);

    datasourceElement.deferredGridOptions = this.deferredGridOptions;
  }

  ngAfterViewInit() {
    setComponentItemsMap(this.gridLayoutElement.nativeElement, this.layoutComponentsMap);

    this.gridLayoutElement.nativeElement.addEventListener(LayoutEmitEvents.firstLoaded, this.setDeferredGridOptions);
  }
  
  ngOnDestroy() {
    this.gridLayoutElement.nativeElement.removeEventListener('click', this.setDeferredGridOptions);
  }
}
