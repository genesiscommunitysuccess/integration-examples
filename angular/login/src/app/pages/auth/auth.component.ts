import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        // Navigate to some route on success
        this.router.navigate(['/protected']);
      } else {
        // Show some error message
        alert('Authentication failed!');
      }
    });
  }
}