import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HtmlApiComponent } from './pages/html-api/html-api.component';
import { JsApiComponent } from './pages/js-api/js-api.component';
import {  JsApiAngularComponentComponent } from './pages/js-api-angular-component/js-api-angular-component.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'html-api',
        component: HtmlApiComponent
    },
    {
        path: 'js-api',
        component: JsApiComponent
    },
    {
        path: 'js-api-angular-component',
        component: JsApiAngularComponentComponent
    },
];
