import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  mockAuth(): void {
    this.authService.login().then((result) =>
      result.subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['/protected']);
        } else {
          alert('Authentication failed!');
        }
      }),
    );
  }
}
