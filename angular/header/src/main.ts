import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { Navigation } from '@genesislcap/foundation-header';
import { provideDesignSystem } from '@genesislcap/foundation-zero';

Navigation;

provideDesignSystem().register();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
