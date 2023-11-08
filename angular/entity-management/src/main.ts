import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { 
  provideDesignSystem, 
  baseComponents,
} from '@genesislcap/foundation-zero';

import { EntityManagement } from '@genesislcap/foundation-entity-management';

EntityManagement;
provideDesignSystem()
    .register(
        baseComponents,
    );

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
