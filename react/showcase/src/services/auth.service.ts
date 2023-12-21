import { getUser } from '@genesislcap/foundation-auth/user';
import { connectService } from './connect.service';
import mockLogin from '../utils/mockLogin';
import { USE_FOUNDATION_AUTH } from '../config';

const STORAGE_KEY = 'isAuthenticated';

class AuthService {
  isAuthenticated = false;

  async login(): Promise<boolean> {
    try {

      if (!connectService.isConnected()) {
          await connectService.init();
          // @todo fix with foundation-authentication 
          await mockLogin(connectService.getContainer());
      }
      localStorage.setItem(STORAGE_KEY, '1');
      this.isAuthenticated = true;
      return true;
    } catch {
      this.logout();
      return false;
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
      isAuthenticated = await this.login();
    }

    if (!isAuthenticated) {
      this.logout();
    }

    return isAuthenticated;
  }
}

export const authService = new AuthService();
