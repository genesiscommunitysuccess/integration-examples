import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  login(username: string, password: string): Observable<boolean> {
    // Here you would make an HTTP request to your authentication server
    // For simplicity, we are just simulating an authentication
    if (username === 'user' && password === 'pass') {
      this.isAuthenticated = true;
      return of(true); // Simulate HTTP request with an observable
    } else {
      this.isAuthenticated = false;
      return of(false); // Simulate failed login
    }
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}