import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
