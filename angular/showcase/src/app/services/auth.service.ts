import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import mockLogin from '../utils/mockLogin';

const STORAGE_KEY = 'isAuthenticated';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  async login(): Promise<Observable<boolean>> {
    try {
      await mockLogin();
      localStorage.setItem(STORAGE_KEY, '1');
      this.isAuthenticated = true;
      return of(true);
    } catch {
      this.isAuthenticated = false;
      return of(false);
    }
  }

  logout(): void {
    localStorage.setItem(STORAGE_KEY, '0');
    this.isAuthenticated = false;
  }

  isUserAuthenticated(): boolean {
    return localStorage.getItem(STORAGE_KEY) === '1';
  }
}
