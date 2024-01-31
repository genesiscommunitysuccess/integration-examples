import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { getUser } from '@genesislcap/foundation-auth/user';
import { getAuthRouting } from '@genesislcap/foundation-auth/routing';
import { ConnectService } from '../services/connect.service';
import { Auth } from '@genesislcap/foundation-comms';
import { USE_FOUNDATION_AUTH } from '../config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  foundationAuthRouting = getAuthRouting();

  constructor(private connectService: ConnectService) {}

  async isUserAuthenticated(): Promise<boolean> {
    let isAuthenticated = false;

    if (USE_FOUNDATION_AUTH) {
      const user = getUser();
      isAuthenticated = user.isAuthenticated;
    } else {
      const auth: Auth = this.connectService.getContainer().get(Auth);
      isAuthenticated = auth.isLoggedIn;
    }

    return isAuthenticated;
  }
}
