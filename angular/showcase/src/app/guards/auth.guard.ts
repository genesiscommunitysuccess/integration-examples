import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConnectService } from '../services/connect.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private connectService: ConnectService,
    private authService: AuthService,
    private router: Router,
  ) {}

  async canActivate(): Promise<boolean> {
    const isUserAuthenticated = await this.authService.isUserAuthenticated();
    if (!isUserAuthenticated) {
      this.router.navigate(['/auth']);
      return false;
    }
    //@todo remove mock after implementing the new auth
    // await this.authService.mockLogin();
    return true;
  }
}
