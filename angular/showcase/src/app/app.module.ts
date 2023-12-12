import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayout } from './layouts/default/default.layout';
import { BlankLayout } from './layouts/blank/blank.layout';
import { FooterComponent } from './components/footer/footer/footer.component';
import { AuthComponent } from './pages/auth/auth.component';
import { StoreModule } from '@ngrx/store';
import { layersReducer } from './store/layers/layers.reducer';
import { stateChangerReducer } from './store/state-changer/state-changer.reducer';
import { LayoutLazyLoadDirective } from './directive/app-lazy-load.directive';

// Genesis Components
import './share/genesis-components';

@NgModule({
  declarations: [AppComponent, AuthComponent, LayoutLazyLoadDirective, DefaultLayout, BlankLayout],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FooterComponent,
    StoreModule.forRoot({ layersState: layersReducer, stateChangerState: stateChangerReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
