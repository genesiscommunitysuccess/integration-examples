import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trades-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trades-chart.component.html',
  styleUrl: './trades-chart.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TradesChartComponent implements AfterViewInit{
  @ViewChild('chart') chartElement!: ElementRef;
  @ViewChild('chartDatasource') chartDatasourceElement!: ElementRef;
 
  configSeted = false;
  lineChartConfiguration = {
    "padding": "auto",
    "seriesField": "side",
    "xField": "groupBy",
    "yField": "value",
    "xAxis": {
        "type": "time",
        "tickCount": 10
    },
    "color": [
        "l(270) 0:#44c14c 1:#69cd70",
        "l(300) 0:#ef4d28 1:#ee6588"
    ],
    "data": [],
    "legend": {
        "selected": {}
    },
    "smooth": true,
    "area": {
        "style": {
            "fillOpacity": 0.15
        }
    },
    "lineStyle": {
        "lineWidth": 5
    },
    "point": {
        "size": 6,
        "shape": "circle",
        "style": {
            "fill": "white",
            "stroke": "#5B8FF9",
            "lineWidth": 2
        }
    }
}

  ngAfterViewInit(): void {
    if (this.chartElement) {
      this.chartElement.nativeElement.config = this.lineChartConfiguration;
      this.configSeted = true;
    }

    if (this.chartDatasourceElement) {
      
      this.chartDatasourceElement.nativeElement.criteria = '((INSTRUMENT_ID == "LLOY"))';
    }

  }
}
