import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';

@Component({
  selector: 'app-html-api',
  standalone: true,
  imports: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  templateUrl: './html-api.component.html',
  styleUrl: './html-api.component.css'
})
export class HtmlApiComponent {
  @ViewChild('foundationLayout') foundationLayout: any;
}
