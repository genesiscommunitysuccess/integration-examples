import { Router } from '@angular/router';

export default class BaseLayout {
  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }
}