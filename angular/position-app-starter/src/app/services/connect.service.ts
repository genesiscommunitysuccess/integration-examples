import { Injectable } from '@angular/core';
import { DI } from '@microsoft/fast-foundation';
import { Connect } from '@genesislcap/foundation-comms';
import { API_DATA } from '../config';

@Injectable({
  providedIn: 'root',
})
export class ConnectService {
  private container = DI.getOrCreateDOMContainer();

  getContainer() {
    return this.container;
  }
}
