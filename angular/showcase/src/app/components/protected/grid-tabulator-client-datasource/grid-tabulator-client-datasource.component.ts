import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasourceDefaults } from '@genesislcap/foundation-comms';
import { DEFAULT_CRITERIA, DEFAULT_RESOURCE_NAME } from '../../../services/store.service';

@Component({
  selector: 'app-grid-tabulator-client-datasource',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-tabulator-client-datasource.component.html',
  styleUrl: './grid-tabulator-client-datasource.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GridTabulatorClientDatasourceComponent implements OnChanges {
  @ViewChild('datasource1') datasource1Element!: any;
  @ViewChild('datasource2') datasource2Element!: any;

  @Input() resourceName: string = DEFAULT_RESOURCE_NAME;
  @Input() criteria: string = DEFAULT_CRITERIA;

  maxView = DatasourceDefaults.MAX_VIEW_1000;
  maxRows = DatasourceDefaults.MAX_ROWS_250;
  restartOnReconnection = true;
  displayZero = false;

  
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['resourceName'] && !changes['criteria']) {
      return;
    }

    console.log({ changes })

    if (changes['resourceName']) {
      this.datasource1Element.nativeElement.resourceName = changes['resourceName'].currentValue;
      this.datasource2Element.nativeElement.resourceName = changes['resourceName'].currentValue;
    }
    if (changes['criteria']) {
      this.datasource1Element.nativeElement.resourceName = changes['resourceName'].currentValue;
      this.datasource2Element.nativeElement.resourceName = changes['resourceName'].currentValue;
    }
  }
}
