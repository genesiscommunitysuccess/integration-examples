import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  login(username: string, password: string): Observable<boolean> {
    if (username === 'user' && password === 'pass') {
      this.isAuthenticated = true;
      return of(true);
    } else {
      this.isAuthenticated = false;
      return of(false);
    }
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isUserAuthenticated(): Promise<boolean> {
    // mock async behavior
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.isAuthenticated), 3000);
    })
  }
}