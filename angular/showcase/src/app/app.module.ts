import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayout } from './layouts/default/default.layout';
import { BlankLayout } from './layouts/blank/blank.layout';
import { AuthComponent } from './pages/auth/auth.component';
import { ProtectedComponent } from './pages/protected/protected.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProtectedComponent,
    DefaultLayout,
    BlankLayout,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
