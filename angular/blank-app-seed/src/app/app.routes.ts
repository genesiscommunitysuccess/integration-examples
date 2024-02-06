import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthLoginComponent } from './pages/auth-login/auth-login.component';
import { HomeComponent } from './pages/home/home.component';
import { USE_FOUNDATION_AUTH } from './config';
import {AuthMockComponent} from "./pages/auth-mock/auth-mock.component";

export const INTERNAL_URLS = {
  auth: 'auth',
  authLogin: 'auth-login',
  authMock: 'auth-mock',
  homepage: 'home',
};

export const AUTH_PATH = INTERNAL_URLS.authMock // USE_FOUNDATION_AUTH ? INTERNAL_URLS.auth : INTERNAL_URLS.authLogin;

export const routes: Routes = [
  {
    path: '',
    redirectTo: `/${INTERNAL_URLS.homepage}`,
    pathMatch: 'full',
  },
  {
    path: INTERNAL_URLS.homepage,
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: INTERNAL_URLS.auth,
    component: AuthComponent,
  },
  {
    path: INTERNAL_URLS.authMock,
    component: AuthMockComponent,
  },
];
