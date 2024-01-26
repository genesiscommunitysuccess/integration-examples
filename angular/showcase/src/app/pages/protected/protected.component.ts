import { Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateChangerComponent } from '../../components/protected/state-changer/state-changer.component';
import { GridProClientDatasourceComponent } from '../../components/protected/grid-pro-client-datasource/grid-pro-client-datasource.component';
import { GridProClientDatasourceLayoutsComponent } from '../../components/protected/grid-pro-client-datasource-layouts/grid-pro-client-datasource-layouts.component';
import { GridProClientDatasourceLinkedComponent } from '../../components/protected/grid-pro-client-datasource-linked/grid-pro-client-datasource-linked.component';
import { GridProServerDatasourceComponent } from '../../components/protected/grid-pro-server-datasource/grid-pro-server-datasource.component';
import { GridTabulatorClientDatasourceComponent } from '../../components/protected/grid-tabulator-client-datasource/grid-tabulator-client-datasource.component';

const addTradeFormSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/QUANTITY',
      label: 'Quantity',
    },
    {
      type: 'Control',
      scope: '#/properties/PRICE',
      label: 'Price',
    },
    {
      type: 'Control',
      scope: '#/properties/COUNTERPARTY_ID',
      options: {
        allOptionsResourceName: 'COUNTERPARTY',
        valueField: 'COUNTERPARTY_ID',
        labelField: 'NAME',
      },
      label: 'Counterparty',
    },
    {
      type: 'Control',
      scope: '#/properties/INSTRUMENT_ID',
      options: {
        allOptionsResourceName: 'INSTRUMENT',
        valueField: 'INSTRUMENT_ID',
        labelField: 'NAME',
      },
      label: 'Instrument',
    },
    {
      type: 'Control',
      scope: '#/properties/SIDE',
      label: 'Side',
    },
  ],
};


import {lineConfiguration} from "../../../sample-data";

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
export class ProtectedComponent {
  public allocationCriteria: string = ''

  readonly gridOptions  = {
    onRowClicked: (e: any) => {
      this.allocationCriteria = `((INSTRUMENT_ID == '${e.data.INSTRUMENT_ID}'))`;
    },
  }

  readonly addTradeFormSchema = addTradeFormSchema;

  readonly linechartConfig = lineConfiguration;

  readonly donutChartConfig = {
    angleField: 'value',
    colorField: 'groupBy',
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
      style: {
        fill: 'white',
      },
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
  }

  linechartCriteria: string = `(((INSTRUMENT_NAME == 'London Stock Exchange Group' && TRADE_STATUS != 'CANCELLED')))`;
}
