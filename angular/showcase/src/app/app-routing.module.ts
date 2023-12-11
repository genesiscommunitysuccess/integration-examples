import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { ProtectedComponent } from './pages/protected/protected.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { ReportingComponent } from './pages/reporting/reporting.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { FiltersComponent } from './pages/filters/filters.component';
import { FormsComponent } from './pages/forms/forms.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
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
  // Redirect to auth if no other route is matched
  { path: '**', redirectTo: '/auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
