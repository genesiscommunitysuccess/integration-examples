import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import BaseLayout from '../base.layout';
import { mainMenu } from '../../config';

@Component({
  selector: 'default-layout',
  templateUrl: './default.layout.html',
  styleUrls: ['./default.layout.css'],
})
export class DefaultLayout extends BaseLayout implements AfterViewInit {
  @ViewChild('foundationHeader') foundationHeaderElement!: ElementRef;
  allRoutes = mainMenu;

  constructor(router: Router) {
    super(router);
  }

  ngAfterViewInit() {
    this.foundationHeaderElement.nativeElement.navigateTo = (path: string) => {
      this.router.navigate([path]);
    };
  }

  onNotificationIconClicked() {
    console.log('Notification icon clicked');
  }
}
