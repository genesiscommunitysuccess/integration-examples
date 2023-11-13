import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  mockAuth(): void {
    this.authService.login().then((result) =>
      result.subscribe(isAuthenticated => {
          if (isAuthenticated) {
            // Navigate to some route on success
            this.router.navigate(['/protected']);
          } else {
            // Show some error message
            alert('Authentication failed!');
          }
        }
    ));
  }
}