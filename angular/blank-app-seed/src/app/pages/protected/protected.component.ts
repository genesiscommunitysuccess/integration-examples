import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css'],
})
export class ProtectedComponent {

}
