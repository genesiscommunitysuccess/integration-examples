import { Component, AfterViewInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA, ViewContainerRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { ChartComponent } from '../../components/chart.component';

@Component({
  selector: 'app-js-api',
  standalone: true,
  imports: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  templateUrl: './js-api.component.html',
  styleUrl: './js-api.component.css'
})
export class JsApiComponent implements AfterViewInit {
  @ViewChild('foundationLayout') foundationLayout: any;

  _addedPaneCount = 0;

  config = {
    width: 700,
    xField: 'value',
    yField: 'groupBy',
    seriesField: 'series',
    legend: {
      position: 'top-left',
    },
  };
  
  data = [
    { groupBy: '1951', value: 38, series: '3' },
    { groupBy: '1952', value: 52, series: '5' },
    { groupBy: '1956', value: 61, series: '1' },
    { groupBy: '1957', value: 145, series: '2' },
    { groupBy: '1958', value: 48, series: '4' },
    { groupBy: '1996', value: 38, series: '6' },
    { groupBy: '1997', value: 52, series: '7' },
    { groupBy: '1999', value: 61, series: '8' },
    { groupBy: '1995', value: 145, series: '9' },
    { groupBy: '1994', value: 48, series: '10' },
  ];

  constructor(private resolver: ComponentFactoryResolver, private injector: Injector) {}

  ngAfterViewInit() {
    const chart: any = document.createElement('rapid-g2plot-chart');
    chart.type = 'bar';
    chart.config = this.config;
    chart.data = this.data;

    const h1 = document.createElement('h1');
    h1.innerHTML = 'Example 1';
    const p1 = document.createElement('p');
    p1.innerHTML = 'Ex 21';

    const h2 = document.createElement('h1');
    h2.innerHTML = 'Example 2';
    const p2 = document.createElement('p');
    p2.innerHTML = 'Ex 2';

    this.foundationLayout.nativeElement.registerItem('chart', [chart]);
    this.foundationLayout.nativeElement.registerItem('1', [h1, p1]);
    this.foundationLayout.nativeElement.registerItem('2', [h2, p2]);
    this.foundationLayout.nativeElement.tryLoadLayoutFromLocalStorage();
  }

  addItem(registration: string) {
    this.foundationLayout.nativeElement.addItem({
      registration,
      title: `${registration} (${(this._addedPaneCount += 1)})`,
      closable: true,

    });
  }

  missingItemOverride = (missingItem: string) => `Missing Item: ${missingItem}`;
}
