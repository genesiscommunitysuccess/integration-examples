import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  provideDesignSystem as provideZeroDesignSystem,
  baseComponents as zeroBaseComponents,
} from '@genesislcap/foundation-zero';

import { zeroGridComponents } from '@genesislcap/foundation-zero-grid-pro';
import { foundationGridComponents } from '@genesislcap/grid-pro';
import { zeroGridTabulatorComponents, foundationGridTabulatorComponents, ZeroGridTabulator } from '@genesislcap/foundation-zero-grid-tabulator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayout } from './layouts/default/default.layout';
import { BlankLayout } from './layouts/blank/blank.layout';
import { FooterComponent } from './components/footer/footer/footer.component';
import { AuthComponent } from './pages/auth/auth.component';

provideZeroDesignSystem().register(
  zeroBaseComponents,
  zeroGridComponents,
  zeroGridTabulatorComponents,
);
@NgModule({
  declarations: [AppComponent, AuthComponent, DefaultLayout, BlankLayout],
  imports: [BrowserModule, AppRoutingModule, FormsModule, FooterComponent],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
