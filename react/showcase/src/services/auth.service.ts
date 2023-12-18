import { Observable, of } from 'rxjs';
import { getUser } from '@genesislcap/foundation-auth/user';
import { connectService } from './connect.service';
import { Auth } from '@genesislcap/foundation-comms';
import mockLogin from '../utils/mockLogin';
import { USE_FOUNDATION_AUTH } from '../config';

const STORAGE_KEY = 'isAuthenticated';

class AuthService {
  isAuthenticated = false;

  async login(): Promise<Observable<boolean>> {
    try {
      await connectService.init();
      // @todo fix with foundation-authenticationw
      await mockLogin(connectService.getContainer());
      localStorage.setItem(STORAGE_KEY, '1');
      this.isAuthenticated = true;
      return of(true);
    } catch {
      this.logout();
      return of(false);
    }
  }

  logout(): void {
    localStorage.setItem(STORAGE_KEY, '0');
    this.isAuthenticated = false;
  }

  async isUserAuthenticated(): Promise<boolean> {
    let isAuthenticated = false;
    
    if (USE_FOUNDATION_AUTH) {
      const user = getUser();
      isAuthenticated = user.isAuthenticated;

    } else if (localStorage.getItem(STORAGE_KEY) === '1') {
      const auth: Auth = connectService.getContainer().get(Auth);
      isAuthenticated = auth.isLoggedIn;
    }

    if (!isAuthenticated) {
      this.logout();
    }

    return isAuthenticated;
  }
}

export const authService = new AuthService();
