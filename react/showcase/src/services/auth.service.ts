import { getUser } from '@genesislcap/foundation-auth/user';
import { USE_FOUNDATION_AUTH } from '../config';

const STORAGE_KEY = 'isAuthenticated';

class AuthService {
  isAuthenticated = false;

  login():boolean {
    localStorage.setItem(STORAGE_KEY, '1');
    this.isAuthenticated = true;
    return true;
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
    } else {
      isAuthenticated = this.login();
    }

    if (!isAuthenticated) {
      this.logout();
    }

    return isAuthenticated;
  }
}

export const authService = new AuthService();
