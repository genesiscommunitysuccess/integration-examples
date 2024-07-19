import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.css',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ], 
})
export class WrapperComponent implements AfterViewInit {
    @ViewChild('barChart') barChart: any;
    title = 'golden-layout-angular';

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
    
    ngAfterViewInit() {
      this.barChart.nativeElement.renderChart();
    }
}
