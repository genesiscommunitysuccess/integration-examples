import { configure, defaultAuthConfig } from '@genesislcap/foundation-auth/config';
import { connectService } from '../services/connect.service';
import { routes } from '../App';

/**
 * Configure the micro frontend
 */
configure({
  name: `client-app-auth`,
  omitRoutes: ['request-account', 'protected'],
  postLoginRedirect: async () => {
    /**
     * Still need to do this for now, as when all the datasources try to self connect, each will close the
     * previous ws connect attempt until we refactor that connect code to share that connect result promise.
     */
    debugger;
    if (!connectService.isConnected()) {
      await connectService.init();
    }
    
     // Check if there is a previous page in the browser history
    if (document.referrer && new URL(document.referrer).origin === window.location.origin && document.referrer !== window.location.href) {
      // Redirect to the referring page if it’s from the same origin
      window.location.href = document.referrer;
    } else {
      // Fallback to the protected if no valid referrer exists
      window.location.href = routes.protected;
    }
    
  },
  postLogoutRedirect: () => {
    if (connectService.isConnected()) {
      connectService.getConnect().disconnect();
    }
    defaultAuthConfig.postLogoutRedirect();
  },
  feedbackDelay: 5000,
});
