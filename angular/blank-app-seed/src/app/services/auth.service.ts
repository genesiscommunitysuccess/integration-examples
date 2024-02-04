import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConnectService } from '../services/connect.service';
import { Auth, BasicAuthInfo } from '@genesislcap/foundation-comms';
import { USE_FOUNDATION_AUTH } from '../config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;

  constructor(private connectService: ConnectService) {}

  async isUserAuthenticated(): Promise<boolean> {
    const auth: Auth = this.connectService.getContainer().get(Auth);
    return auth.isLoggedIn

    // let isAuthenticated = false;
    //
    // if (USE_FOUNDATION_AUTH) {
    //   const user = getUser();
    //   isAuthenticated = user.isAuthenticated;
    // } else {
    //   const auth: Auth = this.connectService.getContainer().get(Auth);
    //   isAuthenticated = auth.isLoggedIn;
    // }
    //
    // return isAuthenticated;
  }

  async login(): Promise<Observable<boolean>> {
    try {
      await this.connectService.init();
      // @todo fix with foundation-authentication
      await this.mockLogin(this.connectService.getContainer());
      localStorage.setItem('isAuthenticated', '1');
      this.isAuthenticated = true;
      return of(true);
    } catch {
      this.logout();
      return of(false);
    }
  }

  logout(): void {
    localStorage.setItem('isAuthenticated', '0');
    this.isAuthenticated = false;
  }

  private mockLogin(diContainer: any) {
    const auth: Auth = diContainer.get(Auth);
    return auth.login({
      type: 'BASIC',
      username: 'JohnDoe',
      password: 'Password11*',
    } as BasicAuthInfo);
  }
}
