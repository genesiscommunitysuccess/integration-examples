import { Component } from '@angular/core';

@Component({
  selector: 'default-layout',
  templateUrl: './default.layout.html',
  styleUrls: ['./default.layout.css']
})
export class DefaultLayout {
  allRoutes = [
    { index: 1, path: 'protected', title: 'Home', icon: 'home', variant: 'solid' },
    { index: 2, path: 'admin', title: 'Admin', icon: 'cog', variant: 'solid' },
    { index: 3, path: 'reporting', title: 'Reporting', icon: 'file-csv', variant: 'solid' },
    { index: 4, path: 'analytics', title: 'Analytics', icon: 'chart-pie', variant: 'solid' },
    { index: 5, path: 'filters', title: 'Filters', icon: 'filter', variant: 'solid' },
    { index: 6, path: 'forms', title: 'Forms', icon: 'list', variant: 'solid' },
    {
      index: 7,
      path: 'notification-dashboard',
      title: 'Notifications',
      icon: 'bell',
      variant: 'solid',
    },
    { index: 8, path: 'features-lab', title: 'Features Lab', icon: 'flask' },
  ];

  onNotificationIconClicked() {
    console.log('Notification icon clicked');
  }
}
