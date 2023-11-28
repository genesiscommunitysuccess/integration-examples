import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reporting } from '@genesislcap/foundation-reporting';

Reporting;

@Component({
  selector: 'app-reporting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reporting.component.html',
  styleUrl: './reporting.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReportingComponent {}
