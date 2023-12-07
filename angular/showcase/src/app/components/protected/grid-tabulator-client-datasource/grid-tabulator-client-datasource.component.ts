import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasourceDefaults } from '@genesislcap/foundation-comms';
import { DI } from '@microsoft/fast-foundation';
import { Connect, Auth } from '@genesislcap/foundation-comms';
@Component({
  selector: 'app-grid-tabulator-client-datasource',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-tabulator-client-datasource.component.html',
  styleUrl: './grid-tabulator-client-datasource.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GridTabulatorClientDatasourceComponent implements AfterViewInit {
  @ViewChild('dataSource1') dataSource1Element!: any;
  @ViewChild('dataSource1test') dataSource1testElement!: any;

  resourceName = 'ALL_COUNTERPARTYS';
  maxView = DatasourceDefaults.MAX_VIEW_1000;
  maxRows = DatasourceDefaults.MAX_ROWS_250;
  criteria = 'NAME != null';
  restartOnReconnection = true;
  displayZero = false;

  ngAfterViewInit(): void {
    const container = DI.getOrCreateDOMContainer();
    const connect: Connect = container.get(Connect);
    console.log({
      element: this.dataSource1Element.nativeElement,
      connect,
      that: this,
      element2: this.dataSource1testElement.nativeElement,
    });
    this.dataSource1testElement.nativeElement.connect = connect;
    this.dataSource1Element.nativeElement.resourceName = this.resourceName;
  }
}
