import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as StateChangerSelector from '../../store/state-changer/state-changer.selectors';
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

import {
  CriteriaBuilder,
  ExpressionBuilder,
  Expression,
  Serialiser,
  Serialisers,
} from '@genesislcap/foundation-criteria';
import {areaConfiguration, lineConfiguration} from "../../../sample-data";
import {chartsGradients} from "@genesislcap/g2plot-chart";

const criteriaBuilder = (): CriteriaBuilder => new CriteriaBuilder();

export const expressionBuilder = (
  field: string,
  value: unknown,
  serialiser: Serialiser
): Expression => {
  return new ExpressionBuilder()
    .withField(field)
    .withValue(value)
    .withSerialiser(serialiser)
    .build();
};

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
export class ProtectedComponent implements OnInit, OnDestroy {
  @ViewChild('zeroTabs') zeroTabsElement!: any;
  @ViewChild('lineChart') lineChart!: any;
  // @ViewChild('areaChartInTab') areaChartInTabElement!: any;
  @ViewChild('donutChart') donutChart!: any;
  @ViewChild('allPositions') allPositions!: any;
  @ViewChild('allTrades') allTrades!: any;
  allocationCriteria: string = ''

  linechartCriteria: string = `(((INSTRUMENT_NAME == 'London Stock Exchange Group' && TRADE_STATUS != 'CANCELLED')))`;
  criteria$: Observable<string> = this.store.select(StateChangerSelector.getCriteria);
  resourceName$: Observable<string> = this.store.select(StateChangerSelector.getResourceName);
  criteria: string = '';
  resourceName: string = '';
  private subscription: Subscription = new Subscription();
  displayStateChanger = true;

  constructor(private store: Store) {
    this.criteria$ = this.store.pipe(select(StateChangerSelector.getCriteria));
    this.resourceName$ = this.store.pipe(select(StateChangerSelector.getResourceName));

  }

  ngAfterViewInit() {
    this.allPositions.nativeElement.gridOptions = {
      onRowClicked: (e: any) => {
        console.log(e);
        this.allocationCriteria = `((INSTRUMENT_ID == '${e.data.INSTRUMENT_ID}'))`;
      },
    }
    this.allTrades.nativeElement.createFormUiSchema = addTradeFormSchema;
    this.donutChart.nativeElement.config = {
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
    };
    this.lineChart.nativeElement.config = {
      padding: 'auto',
      seriesField: 'series',
      xField: 'groupBy',
      yField: 'value',
      xAxis: {
        // type: 'time',
        tickCount: 10,
      },
      color: [chartsGradients.rapidGreen, chartsGradients.rapidRed],
    };
    this.lineChart.nativeElement.config = lineConfiguration;
    this.linechartCriteria = criteriaBuilder()
      .withExpression([
        expressionBuilder('INSTRUMENT_NAME', "VOD", Serialisers.EQ),
      ])
      .build();
  }

  ngOnInit() {

    this.subscription.add(
      this.criteria$.subscribe((value) => {
        this.criteria = value;
      }),
    );

    this.subscription.add(
      this.resourceName$.subscribe((value) => {
        this.resourceName = value;
      }),
    );
  }

  onTabChanged({ detail }: any) {
    this.displayStateChanger = !Object.prototype.hasOwnProperty.call(
      detail.attributes,
      'hide-state-changer',
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
