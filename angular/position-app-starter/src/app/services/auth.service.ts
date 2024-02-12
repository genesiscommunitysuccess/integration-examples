import { Injectable } from '@angular/core';
import { ConnectService } from '../services/connect.service';
import { Auth } from '@genesislcap/foundation-comms';
import {DI} from "@microsoft/fast-foundation";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private connectService: ConnectService) {}

  async isUserAuthenticated(): Promise<boolean> {
    const auth: Auth = DI.getOrCreateDOMContainer().get(Auth);
    return auth.isLoggedIn
  }
}
