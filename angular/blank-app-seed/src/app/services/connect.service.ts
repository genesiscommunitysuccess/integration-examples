import { Injectable } from '@angular/core';
import { DI } from '@microsoft/fast-foundation';
import { Connect } from '@genesislcap/foundation-comms';
import { API_DATA } from '../config';

@Injectable({
  providedIn: 'root',
})
export class ConnectService {
  private container = DI.getOrCreateDOMContainer();
  private connect: Connect = this.container.get(Connect);

  getContainer() {
    return this.container;
  }

  getConnect() {
    return this.connect;
  }

  init() {
    return this.connect.connect(API_DATA.URL);
  }
}
