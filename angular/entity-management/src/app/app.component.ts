import { Component, OnInit } from '@angular/core';
import getApiHelper from './utils/getApiHelper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'Genesis Foundation Entity Managment  Angular';
  isSubscribed  = false;

  ngOnInit() {
    const { run, login, subscribe } = getApiHelper();

    subscribe(async (isSubscribed: any) => {
      if (isSubscribed ) {
        try {
          await login();
          this.isSubscribed = true
        } catch {
          this.isSubscribed = false
        }
      }
    });

    run();
  }
}