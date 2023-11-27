import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewChild, AfterViewInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriteriaSegmentedControl } from '@genesislcap/foundation-criteria';

CriteriaSegmentedControl;

@Component({
  selector: 'app-filtered-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filtered-chart.component.html',
  styleUrl: './filtered-chart.component.css',
  schemas:[ CUSTOM_ELEMENTS_SCHEMA ],
})
export class FilteredChartComponent implements AfterViewInit  {
  @ViewChild('criteriaSegmentedControl') criteriaSegmentedControlElement!: any;
  @Input() toolbarOptions: any
  @Input() pieConfig: any

  criteriaFilter = [{ label: Math.random(), field: 'INSTRUMENT_ID', value: 'VOD', serialiser: () => {} }]

  ngAfterViewInit() {
    console.log('ngAfterViewInit')
    setInterval(() => {
    this.updateWebComponent([ { label: Math.random(), field: 'INSTRUMENT_ID', value: 'VOD', serialiser: 'EQ' },]);
    }, 3000)

    setTimeout(() => {
      const element = this.criteriaSegmentedControlElement.nativeElement;
      console.log({ element });
    }, 0);
    
  }

  updateWebComponent(items: any[]) {
    const myComponent = this.criteriaSegmentedControlElement.nativeElement
    myComponent.noObservedAttributes = items;

    //@ts-ignore
    window.testItem = myComponent;
  }
  handleChangedCriteriaFilter(event: any) {
    console.log('handleChangedCriteriaFilter', event);
  }
}
