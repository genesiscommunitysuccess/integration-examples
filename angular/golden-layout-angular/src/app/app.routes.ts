import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HtmlApiComponent } from './pages/html-api/html-api.component';
import { JsApiComponent } from './pages/js-api/js-api.component';

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
];
