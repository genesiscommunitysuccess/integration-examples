import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { provideDesignSystem, baseComponents } from '@genesislcap/foundation-zero';
import { zeroGridComponents } from '@genesislcap/foundation-zero-grid-pro';
import { EntityManagement } from '@genesislcap/foundation-entity-management';
import { fastButton, provideFASTDesignSystem } from '@microsoft/fast-components';

EntityManagement;
provideDesignSystem().register(baseComponents, zeroGridComponents);
provideFASTDesignSystem().register(fastButton());

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
