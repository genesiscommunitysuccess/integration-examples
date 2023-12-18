import { configure } from '@genesislcap/foundation-auth/config';
import type { Router } from '@angular/router';
import { INTERNAL_URLS } from '../config';

/**
 * Configure the micro frontend
 */
export const configureFoundationAuth = ({ router, connectService }: { router: Router, connectService: any }) => configure({
  omitRoutes: ['request-account'],
  postLoginRedirect: async () => {
    await connectService.init(); 
    router.navigate([`/${INTERNAL_URLS.homepage}`]);     
  },
});