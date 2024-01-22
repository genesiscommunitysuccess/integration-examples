import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConnectService } from '../services/connect.service';
import { AUTH_URL } from '../config';

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
      this.router.navigate([`/${AUTH_URL}`]);
      return false;
    }
    return true;
  }
}
