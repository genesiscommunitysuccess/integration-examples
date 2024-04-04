import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriteriaSegmentedControlOption, Serialisers } from '@genesislcap/foundation-criteria';
import { FoundationLayout, LayoutEmitEvents } from '@genesislcap/foundation-layout';

import {
  AnalyticChartRegistration,
  SavedLayoutKeys,
  LayoutComponentsNames,
} from './analitics.types';
import * as savedLayout from '../../../sample-data/saved-layouts';
import {
  areaConfiguration,
  barConfiguration,
  barData,
  columnConfiguration,
  dualaxesConfiguration,
  dualaxesData,
  lineConfiguration,
  pieConfiguration,
  pieData,
  roseConfiguration,
  roseData,
  stockConfiguration,
  stockData,
  mixConfiguration,
} from '../../../sample-data';
import {
  setComponentItemsMap,
  getElementByTagFromComponent,
} from '../../utils/goldenLayout.helper';

const chartConfigMap: Map<LayoutComponentsNames, any> = new Map([
  [LayoutComponentsNames.AREA, areaConfiguration as any],
  [LayoutComponentsNames.BAR, barConfiguration as any],
  [LayoutComponentsNames.COLUMN, columnConfiguration as any],
  [LayoutComponentsNames.LINE, lineConfiguration as any],
  [LayoutComponentsNames.MIX, mixConfiguration as any],
  [LayoutComponentsNames.PIE, pieConfiguration as any],
  [LayoutComponentsNames.ROSE, roseConfiguration as any],
  [LayoutComponentsNames.STOCK, stockConfiguration as any],
  [LayoutComponentsNames.DONUT, pieConfiguration as any],
]);
const chartDataMap: Map<LayoutComponentsNames, any> = new Map([
  [LayoutComponentsNames.BAR, barData as any],
  [LayoutComponentsNames.PIE, pieData as any],
  [LayoutComponentsNames.ROSE, roseData as any],
  [LayoutComponentsNames.STOCK, stockData as any],
]);
const layoutSaveKey = 'analytics-layout-save-key';
const toolbarOptions: CriteriaSegmentedControlOption[] = [
  { label: 'VOD', field: 'INSTRUMENT_ID', value: 'VOD', serialiser: Serialisers.EQ },
  { label: 'BP', field: 'INSTRUMENT_ID', value: 'BP', serialiser: Serialisers.EQ },
  { label: 'LSEG', field: 'INSTRUMENT_ID', value: 'LSEG', serialiser: Serialisers.EQ },
];
const helperCriteriaEvent = (criteriaSegmentedControl: any, chartDataResource: any) => {
  const handler = ({ target }: any) => {
    chartDataResource.criteria = target.value;
  };
  criteriaSegmentedControl.addEventListener('change', handler);
  return () => criteriaSegmentedControl.removeEventListener('change', handler);
};
@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AnalyticsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('analyticsLayout') analyticsLayoutElement!: any;
  @ViewChild('pieChartDataSourceInTab') pieChartDataSourceInTabElement!: any;

  layoutComponentsMap: Map<LayoutComponentsNames, any> = new Map();
  onDestroyActions: (() => void)[] = [];
  ribbonButtonsConfig: AnalyticChartRegistration[] = [];
  pieConfiguration= pieConfiguration;
  pieData = pieData;
  toolbarOptions = toolbarOptions;
  areaConfiguration = areaConfiguration;
  barConfiguration = barConfiguration;
  barData = barData;
  columnConfiguration = columnConfiguration;
  dualaxesConfiguration = dualaxesConfiguration;
  dualaxesData = [dualaxesData, dualaxesData];
  lineConfiguration = lineConfiguration;
  roseConfiguration = roseConfiguration;
  roseData = roseData;
  mixConfiguration = mixConfiguration;

  layoutListeners: ({ eventName: string, action: () => void })[] = [];

  setCriteriaPieChart = ({ target }: any) => {
    this.pieChartDataSourceInTabElement.nativeElement.criteria = target.value;
  }

  setChartsConfigAndData() {
    this.layoutComponentsMap.forEach((layoutComponent, key) => {
      const chart = getElementByTagFromComponent(layoutComponent, 'zero-g2plot-chart');
      const chartConfig = chartConfigMap.get(key);
      const chartData = chartDataMap.get(key);

      if (chartConfig) {
        chart.config = chartConfig;
      }

      if (chartData) {
        chart.data = chartData;
      }

      // workaround for chart type stock
      if (key === LayoutComponentsNames.STOCK) {
        chart.renderChart();
      }
    });
  }

  setLayoutChildrenProps() {
    const roseLayoutComponent = this.layoutComponentsMap.get(LayoutComponentsNames.ROSE);
    const roseChart = getElementByTagFromComponent(roseLayoutComponent, 'zero-g2plot-chart');
    roseChart.legendParser = this.roseLegendParser;

    const pieLayoutComponent = this.layoutComponentsMap.get(LayoutComponentsNames.PIE);
    const criteriaSegmentedControl = getElementByTagFromComponent(
      pieLayoutComponent,
      'criteria-segmented-control',
    );
    criteriaSegmentedControl.criteriaOptions = toolbarOptions;
  }

  handleEmmitsInsideLayout() {
    const pieLayoutComponent = this.layoutComponentsMap.get(LayoutComponentsNames.PIE);
    const criteriaSegmentedControl = getElementByTagFromComponent(
      pieLayoutComponent,
      'criteria-segmented-control',
    );
    const pieChartDataResource = getElementByTagFromComponent(
      pieLayoutComponent,
      'chart-datasource',
    );

    this.onDestroyActions.push(helperCriteriaEvent(criteriaSegmentedControl, pieChartDataResource));
  }

  ngAfterViewInit() {
    try {
      setComponentItemsMap(this.analyticsLayoutElement.nativeElement, this.layoutComponentsMap);
    } catch (e) {
      console.error(e);
    }

    const updateRibbonButtons = this.upadateRibbonButtons.bind(this);

    const firstLoaded = () => {
      this.setChartsConfigAndData();
      this.setLayoutChildrenProps();
      this.handleEmmitsInsideLayout();
      this.upadateRibbonButtons();
    };

    this.analyticsLayoutElement.nativeElement.addEventListener(
      LayoutEmitEvents.firstLoaded,
      firstLoaded,
    );
    this.analyticsLayoutElement.nativeElement.addEventListener(
      LayoutEmitEvents.itemAdded,
      updateRibbonButtons,
    );
    this.analyticsLayoutElement.nativeElement.addEventListener(
      LayoutEmitEvents.itemRemoved,
      updateRibbonButtons,
    );
    this.analyticsLayoutElement.nativeElement.addEventListener(
      LayoutEmitEvents.firstLoaded,
      updateRibbonButtons,
    );

    this.layoutListeners.push(
      {
        eventName: LayoutEmitEvents.firstLoaded,
        action: firstLoaded,
      },
      {
        eventName: LayoutEmitEvents.itemAdded,
        action: updateRibbonButtons,
      },
      {
        eventName: LayoutEmitEvents.itemRemoved,
        action: updateRibbonButtons,
      },
      {
        eventName: LayoutEmitEvents.firstLoaded,
        action: updateRibbonButtons,
      },
    );
  }

  upadateRibbonButtons() {
    const currentlyAddedItem = FoundationLayout.layoutRequiredRegistrations(
      this.analyticsLayoutElement.nativeElement.getLayout(),
    );

    this.ribbonButtonsConfig = Array.from(
      this.analyticsLayoutElement.nativeElement.querySelectorAll('zero-layout-item'),
    ).map(({ registration, title }: any) => ({
      registration,
      title,
      enabled: !currentlyAddedItem.includes(registration),
    }));
  }

  saveLayoutButtonHandler() {
    const layout = this.analyticsLayoutElement.nativeElement.getLayout();
    localStorage.setItem(layoutSaveKey, JSON.stringify(layout));
  }

  loadLayoutButtonHandler() {
    const layout = localStorage.getItem(layoutSaveKey);
    if (!layout) return;
    this.setLayout(layout);
  }

  loadPredefinedLayout(layoutName: SavedLayoutKeys) {
    this.setLayout(savedLayout[layoutName]);
    this.upadateRibbonButtons();
  }

  setLayout(config: any) {
    this.analyticsLayoutElement.nativeElement.loadLayout(JSON.parse(config));
    this.setChartsConfigAndData();
    this.setLayoutChildrenProps();
  }

  // Rose charts already have this as the default parser, but leaving as an example
  roseLegendParser = ({ series }: { series: string }) => series;

  addChartToLayout({ registration: registration, title: title }: AnalyticChartRegistration) {
    this.analyticsLayoutElement.nativeElement.addItem({
      registration,
      title,
      closable: true,
    });
    this.setChartsConfigAndData();
    this.setLayoutChildrenProps();
  }

  ngOnDestroy() {
    this.layoutListeners.forEach(({ eventName, action }) => {
      this.analyticsLayoutElement.nativeElement.removeEventListener(eventName, action);
    });
  }
}
