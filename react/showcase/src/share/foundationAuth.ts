import { configure } from '@genesislcap/foundation-auth/config';

/**
 * Configure the micro frontend
 */
configure({
  omitRoutes: ['request-account'],
  postLoginRedirect: () => {},
});
