import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UrlWatcherService } from '../../services/url-watcher.service';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthLoginComponent {
  constructor(private urlWatcherService: UrlWatcherService) {}
}
