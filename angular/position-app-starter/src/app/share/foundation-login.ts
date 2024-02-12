import { configure, define } from '@genesislcap/foundation-login';
import type { Router } from '@angular/router';
import { INTERNAL_URLS } from '../app.routes';

/**
 * Configure the micro frontend
 */
export const configureFoundationLogin = ({
  router,
  connectService,
}: {
  router: Router;
  connectService: any;
}) => {

  const container = connectService.getContainer();

  configure(container, {
    showConnectionIndicator: true,
    hostPath: INTERNAL_URLS.auth,
    redirectHandler: url => {
      router.navigate([INTERNAL_URLS.homepage])
    }
  });

  return define({
    name: `client-app-login`,
  });
}
