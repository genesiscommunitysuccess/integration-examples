import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthLoginComponent } from './pages/auth-login/auth-login.component';
import { ProtectedComponent } from './pages/protected/protected.component';
import { USE_FOUNDATION_AUTH } from './config';

export const INTERNAL_URLS = {
  auth: 'auth',
  authLogin: 'auth-login',
  homepage: 'protected',
};

export const AUTH_PATH = USE_FOUNDATION_AUTH ? INTERNAL_URLS.auth : INTERNAL_URLS.authLogin;

export const routes: Routes = [
  {
    path: '',
    redirectTo: `/${INTERNAL_URLS.homepage}`,
    pathMatch: 'full',
  },
  {
    path: INTERNAL_URLS.homepage,
    canActivate: [AuthGuard],
    component: ProtectedComponent,
  },
  {
    path: INTERNAL_URLS.auth,
    component: AuthComponent,
  },
  {
    path: INTERNAL_URLS.authLogin,
    component: AuthLoginComponent,
  },
];
