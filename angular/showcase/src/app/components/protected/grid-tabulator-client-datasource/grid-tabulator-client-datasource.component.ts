import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasourceDefaults } from '@genesislcap/foundation-comms';
import { STATE_CHANGER_CONFIG } from '../../../config';
import {
  setComponentItemsMap,
  getElementByTagFromComponent,
} from '../../../utils/goldenLayout.helper';
import { LayoutEmitEvents } from '@genesislcap/foundation-layout';
import { LayoutComponentsNames } from './grid-tabulator-client-datasource.types';
@Component({
  selector: 'app-grid-tabulator-client-datasource',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-tabulator-client-datasource.component.html',
  styleUrl: './grid-tabulator-client-datasource.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GridTabulatorClientDatasourceComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('gridLayout') gridLayoutElement!: any;

  @Input() resourceName: string = STATE_CHANGER_CONFIG.DEFAULT_RESOURCE_NAME;
  @Input() criteria: string = STATE_CHANGER_CONFIG.DEFAULT_CRITERIA;

  layoutComponentsMap: Map<LayoutComponentsNames, any> = new Map();
  maxView = DatasourceDefaults.MAX_VIEW_1000;
  maxRows = DatasourceDefaults.MAX_ROWS_250;
  restartOnReconnection = true;
  ready = false;
  listeners: (()=>void)[] = [];

  setReady() {
    this.ready = true;
  }

  ngAfterViewInit() {
    setComponentItemsMap(this.gridLayoutElement.nativeElement, this.layoutComponentsMap);
    const listner = this.setReady.bind(this);
    this.listeners.push(listner);
    this.gridLayoutElement.nativeElement.addEventListener(LayoutEmitEvents.firstLoaded, listner);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['resourceName'] && !changes['criteria'] && !this.ready) {
      return;
    }

    if (this.layoutComponentsMap.size > 0) {
      this.layoutComponentsMap.forEach((component: any) => {
        const datasource = getElementByTagFromComponent(
          component,
          'grid-tabulator-client-side-datasource',
        );

        if (changes['resourceName']) {
          datasource.resourceName = changes['resourceName'].currentValue;
        }

        if (changes['criteria']) {
          datasource.criteria = changes['criteria'].currentValue;
        }
      });
    }
  }

  ngOnDestroy() {
    this.listeners.forEach((listener) => {
      this.gridLayoutElement.nativeElement.removeEventListener(
        LayoutEmitEvents.firstLoaded,
        listener,
      );
    });
  }
}
