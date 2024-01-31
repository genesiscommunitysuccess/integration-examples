import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { ConnectService } from './services/connect.service';
import { configureFoundationAuth } from './share/foundation-auth';
import { configureFoundationLogin } from './share/foundation-login';
import { USE_FOUNDATION_AUTH } from './config'

// Genesis Components
import './share/genesis-components';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'blank-app-seed';

  constructor(
    private router: Router,
    private connectService: ConnectService,
  ) {
    if (USE_FOUNDATION_AUTH) {
      // set foundation-auth
      configureFoundationAuth({ router, connectService });
    } else {
      // set foundation-login
      configureFoundationLogin({ router, connectService });
    }

    // // Set layout componet based on route
    // router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.layoutName = getLayoutNameByRoute(event.urlAfterRedirects);
    //   }
    // });
  }
}
