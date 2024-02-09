import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
// In your home.component.ts file
  protected addTradeFormSchema: any = {
    type: 'VerticalLayout',
    elements: [
      {
        scope: '#/properties/QUANTITY',
        label: 'Quantity',
      },
      {
        scope: '#/properties/PRICE',
        label: 'Price',
      },
      {
        scope: '#/properties/COUNTERPARTY_ID',
        options: {
          allOptionsResourceName: 'COUNTERPARTY',
          valueField: 'COUNTERPARTY_ID',
          labelField: 'NAME',
        },
        label: 'Counterparty',
      },
      {
        scope: '#/properties/INSTRUMENT_ID',
        options: {
          allOptionsResourceName: 'INSTRUMENT',
          valueField: 'INSTRUMENT_ID',
          labelField: 'NAME',
        },
        label: 'Instrument',
      },
      {
        scope: '#/properties/SIDE',
        label: 'Side',
      },
    ],
  };
// ... other component code
}
