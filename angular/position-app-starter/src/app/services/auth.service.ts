import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConnectService } from '../services/connect.service';
import { Auth, BasicAuthInfo } from '@genesislcap/foundation-comms';
import { USE_FOUNDATION_AUTH } from '../config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private connectService: ConnectService) {}

  async isUserAuthenticated(): Promise<boolean> {
    const auth: Auth = this.connectService.getContainer().get(Auth);
    return auth.isLoggedIn
  }
}
