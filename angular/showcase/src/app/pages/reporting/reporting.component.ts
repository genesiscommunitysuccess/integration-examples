import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reporting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reporting.component.html',
  styleUrl: './reporting.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReportingComponent implements AfterViewInit {
  ready: boolean = false;

  ngAfterViewInit(): void {
    // @todo - this is a workaround for foundation-reporting which includes path '' for reporting in config:
    // https://github.com/genesislcap/foundation-ui/blob/62024ec5e139ca25c5d65e11798e009a1e86074d/packages/foundation/foundation-mf/foundation-reporting/src/routes/config.ts#L43C13-L43C13
    // without that FastRouter from foundation-reporting will call falback and redirect to not found page
    history.pushState(null, '', '/'); 
    this.ready = true;
    setTimeout(() => {
      history.pushState(null, '', '/reporting'); 
    }, 1000);
  }
}
