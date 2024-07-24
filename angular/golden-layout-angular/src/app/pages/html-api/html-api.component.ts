import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { ChartComponent } from '../../components/chart.component'

@Component({
  selector: 'app-html-api',
  standalone: true,
  imports: [ ChartComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  templateUrl: './html-api.component.html',
  styleUrl: './html-api.component.css'
})
export class HtmlApiComponent {
  @ViewChild('foundationLayout') foundationLayout: any;
}
