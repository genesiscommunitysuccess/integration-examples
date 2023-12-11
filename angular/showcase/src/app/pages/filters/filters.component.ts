import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, AfterViewInit } from '@angular/core';

type Keys = 'allUsersfilters' | 'allTradesfilters' | 'allProfilesfilters';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FiltersComponent implements AfterViewInit {
  @ViewChild('dateFilter') dateFilterElement!: any;

  allUsersfilters = '';
  allTradesfilters = '';
  allProfilesfilters = '';

  ngAfterViewInit() {
    this.dateFilterElement.nativeElement.uischema = {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          label: 'Date',
          scope: '#/properties/TRADE_DATETIME',
        },
      ],
    };
    this.dateFilterElement.nativeElement.jsonSchema = {
      type: 'object',
      properties: {
        TRADE_DATETIME: {
          type: 'string',
          description: 'org.joda.time.DateTime',
        },
      },
    };
  }

  handleChange({ target }: any, key: Keys) {
    this[key] = target.value;
  }

  handleSubmit() {
    console.log('$emit test');
  }
}
