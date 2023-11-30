import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grid-tabulator-client-datasource',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-tabulator-client-datasource.component.html',
  styleUrl: './grid-tabulator-client-datasource.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GridTabulatorClientDatasourceComponent {

}
