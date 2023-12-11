import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import type { LayoutComponentName } from './types/layout';
import getLayoutNameByRoute from './utils/getLayoutNameByRoute';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  layoutName?: LayoutComponentName;
  showFooter = false;
  title = 'Genesis Foundation Entity Managment Angular';
  isSubscribed = false;

  constructor(private router: Router) {
    // Set layout componet based on route
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.layoutName = getLayoutNameByRoute(event.urlAfterRedirects);
      }
    });
  }
}
