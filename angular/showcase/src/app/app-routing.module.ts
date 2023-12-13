import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthMockComponent } from './pages/auth-mock/auth-mock.component';
import { ProtectedComponent } from './pages/protected/protected.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { ReportingComponent } from './pages/reporting/reporting.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { FiltersComponent } from './pages/filters/filters.component';
import { FormsComponent } from './pages/forms/forms.component';
import { NotificationDashboardComponent } from './pages/notification-dashboard/notification-dashboard.component';
import { FeaturesLabComponent } from './pages/features-lab/features-lab.component';
import { INTERNAL_URLS, AUTH_URL } from './config';

const routes: Routes = [
  {
    path: INTERNAL_URLS.auth,
    component: AuthComponent,
  },
  {
    path: INTERNAL_URLS.authMock,
    component: AuthMockComponent,
  },
  {
    path: 'protected',
    canActivate: [AuthGuard],
    component: ProtectedComponent,
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminComponent,
  },
  {
    path: 'reporting',
    canActivate: [AuthGuard],
    component: ReportingComponent,
  },
  {
    path: 'analytics',
    canActivate: [AuthGuard],
    component: AnalyticsComponent,
  },
  {
    path: 'filters',
    canActivate: [AuthGuard],
    component: FiltersComponent,
  },
  {
    path: 'forms',
    canActivate: [AuthGuard],
    component: FormsComponent,
  },
  {
    path: 'notification-dashboard',
    canActivate: [AuthGuard],
    component: NotificationDashboardComponent,
  },
  {
    path: 'features-lab',
    canActivate: [AuthGuard],
    component: FeaturesLabComponent,
  },
  // Redirect to auth if no other route is matched
  { path: '**', redirectTo: `/${AUTH_URL}` },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
