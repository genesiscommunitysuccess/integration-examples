import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { Navigation } from '@genesislcap/foundation-header';
import { provideDesignSystem, baseComponents } from '@genesislcap/foundation-zero';
import { fastButton, provideFASTDesignSystem } from '@microsoft/fast-components';
import { foundationLayoutComponents } from '@genesislcap/foundation-layout';

Navigation;
provideDesignSystem().register(baseComponents, foundationLayoutComponents);
provideFASTDesignSystem().register(fastButton());

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
