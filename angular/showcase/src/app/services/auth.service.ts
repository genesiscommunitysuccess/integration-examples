import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { getUser } from '@genesislcap/foundation-auth/user';
import { getAuthRouting } from '@genesislcap/foundation-auth/routing';
import { ConnectService } from '../services/connect.service';
import { Auth } from '@genesislcap/foundation-comms';
import mockLogin from '../utils/mockLogin';
import { USE_FOUNDATION_AUTH } from '../config';

const STORAGE_KEY = 'isAuthenticated';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  foundationAuthRouting = getAuthRouting();

  constructor(private connectService: ConnectService) {}

  async login(): Promise<Observable<boolean>> {
    try {
      await this.connectService.init();
      // @todo fix with foundation-authentication
      await mockLogin(this.connectService.getContainer());
      localStorage.setItem(STORAGE_KEY, '1');
      this.isAuthenticated = true;
      return of(true);
    } catch {
      this.logout();
      return of(false);
    }
  }

  logout(): void {
    if (USE_FOUNDATION_AUTH) {
      this.foundationAuthRouting.navigateTo('logout');
    } else {
      localStorage.setItem(STORAGE_KEY, '0');
      this.isAuthenticated = false;
    }
  }

  async isUserAuthenticated(): Promise<boolean> {
    let isAuthenticated = false;

    if (USE_FOUNDATION_AUTH) {
      const user = getUser();
      isAuthenticated = user.isAuthenticated;
    } else if (localStorage.getItem(STORAGE_KEY) === '1') {
      const auth: Auth = this.connectService.getContainer().get(Auth);
      isAuthenticated = auth.isLoggedIn;
    }

    if (!isAuthenticated) {
      this.logout();
    }

    return isAuthenticated;
  }
}
