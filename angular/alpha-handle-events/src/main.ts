import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { 
  provideDesignSystem, 
  alphaFlyout,
  alphaIcon,
} from '@genesislcap/alpha-design-system';

provideDesignSystem()
    .register(
      alphaFlyout(),
      alphaIcon(),
    );

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
