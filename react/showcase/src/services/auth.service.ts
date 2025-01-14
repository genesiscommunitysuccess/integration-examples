import { getUser } from '@genesislcap/foundation-auth/user';

class AuthService {
  isAuthenticated = false;

  login(): void {
    // login
  }

  logout(): void {
    // logout
  }

  async isUserAuthenticated(): Promise<boolean> {
    debugger;
    const user = getUser();
    return user.isAuthenticated;
  }
}

export const authService = new AuthService();
