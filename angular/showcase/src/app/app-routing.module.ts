import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { ProtectedComponent } from './pages/protected/protected.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { ReportingComponent } from './pages/reporting/reporting.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';

const routes: Routes = [
  {
    path: 'protected',
    canActivate: [AuthGuard],
    component: ProtectedComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'reporting',
    component: ReportingComponent,
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
  },
  // Redirect to auth if no other route is matched
  { path: '**', redirectTo: '/auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
