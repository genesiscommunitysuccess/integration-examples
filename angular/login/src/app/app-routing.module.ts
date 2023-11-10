import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { ProtectedComponent } from './pages/protected/protected.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'protected',
    canActivate: [AuthGuard],
    component: ProtectedComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  // Redirect to auth if no other route is matched
  { path: '**', redirectTo: '/auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }