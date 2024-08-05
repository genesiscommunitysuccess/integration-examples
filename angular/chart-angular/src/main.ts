import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Genesis Components
import './share/genesis-components';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
