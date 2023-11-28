import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayout } from './layouts/default/default.layout';
import { BlankLayout } from './layouts/blank/blank.layout';
import { FooterComponent } from './components/footer/footer/footer.component';
import { AuthComponent } from './pages/auth/auth.component';

@NgModule({
  declarations: [AppComponent, AuthComponent, DefaultLayout, BlankLayout],
  imports: [BrowserModule, AppRoutingModule, FormsModule, FooterComponent],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
