import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Injectable, OnDestroy } from '@angular/core';
import { INTERNAL_URLS } from '../app.routes';

@Injectable({
  providedIn: 'root'
})
export class UrlWatcherService implements OnDestroy {
  private currentUrl: string;
  private checkInterval = 100; // Check every 1000 ms (1 second)
  private intervalId: any;

  constructor(private router: Router, private location: Location) {
    this.currentUrl = this.location.path();
    this.watchUrlChanges();
  }

  watchUrlChanges() {
    this.intervalId = setInterval(() => {
      let newUrl = this.location.path();
      if (newUrl !== this.currentUrl && newUrl == `/${INTERNAL_URLS.homepage}`) {
        this.currentUrl = newUrl;
        this.router.navigate([`/${INTERNAL_URLS.homepage}`]).then(success => {
          if (!success) {
            console.error('Navigation failed!');
          }
        });
      }
    }, this.checkInterval);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
