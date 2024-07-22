import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChartComponent } from '../../components/chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ ChartComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
