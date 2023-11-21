import { Component } from '@angular/core';
import { Router } from '@angular/router';
import BaseLayout from '../base.layout';
import { mainMenu } from '../../config';

@Component({
  selector: 'default-layout',
  templateUrl: './default.layout.html',
  styleUrls: ['./default.layout.css'],
})
export class DefaultLayout extends BaseLayout {
  allRoutes = mainMenu;

  constructor(router: Router) {
    super(router);
  }

  onNotificationIconClicked() {
    console.log('Notification icon clicked');
  }

  test() {
    console.log('test clicked');
  }
}
