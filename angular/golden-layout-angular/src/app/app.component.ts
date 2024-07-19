import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WrapperComponent } from './components/wrapper.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WrapperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ], 
})
export class AppComponent {
  title = 'golden-layout-angular';

}
