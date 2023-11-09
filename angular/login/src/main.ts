import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { 
  provideDesignSystem, 
  baseComponents,
} from '@genesislcap/foundation-zero';
import { 
  zeroGridComponents,
} from '@genesislcap/foundation-zero-grid-pro';

import { Login } from '@genesislcap/foundation-login';

Login;

provideDesignSystem()
    .register(
        baseComponents,
        zeroGridComponents,
    );

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
