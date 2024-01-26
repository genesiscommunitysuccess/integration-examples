import type { MainMenu } from './types/menu';
import type { LayoutComponentName } from './types/layout';

export const INTERNAL_URLS = {
  auth: 'auth',
  authMock: 'auth-mock',
  homepage: 'protected',
};

export const USE_FOUNDATION_AUTH = GENX_FOUNDATION_AUTH === '1';

export const AUTH_URL = USE_FOUNDATION_AUTH ? INTERNAL_URLS.auth : INTERNAL_URLS.authMock;

export const layoutComponentName = {
  default: 'DefaultLayoutComponent',
  simple: 'SimpleLayoutComponent',
  blank: 'BlankLayoutComponent',
};

export const layoutComponentImportsByName = {
  [layoutComponentName.default]: () =>
    import('./layouts/default/default.layout').then((m) => m.DefaultLayoutComponent),
  [layoutComponentName.simple]: () =>
    import('./layouts/simple/simple.layout').then((m) => m.SimpleLayoutComponent),
  [layoutComponentName.blank]: () =>
    import('./layouts/blank/blank.layout').then((m) => m.BlankLayoutComponent),
};

export const layoutNameByRouteMap: Map<string, LayoutComponentName> = new Map([
  [`/${INTERNAL_URLS.auth}`, layoutComponentName.blank],
  [`/${INTERNAL_URLS.authMock}`, layoutComponentName.simple],
]);

export const API_DATA = {
  URL: 'ws://dev-position2/gwf/',
  AUTH: {
    username: 'JohnDoe',
    password: 'Password11*',
  },
};

export const mainMenu: MainMenu = [
  { index: 1, path: 'protected', title: 'Home', icon: 'home', variant: 'solid' },
  // { index: 2, path: 'admin', title: 'Admin', icon: 'cog', variant: 'solid' },
  // { index: 3, path: 'reporting', title: 'Reporting', icon: 'file-csv', variant: 'solid' },
  { index: 4, path: 'analytics', title: 'Analytics', icon: 'chart-pie', variant: 'solid' },
  // { index: 5, path: 'filters', title: 'Filters', icon: 'filter', variant: 'solid' },
  // { index: 6, path: 'forms', title: 'Forms', icon: 'list', variant: 'solid' },
  // {
  //   index: 7,
  //   path: 'notification-dashboard',
  //   title: 'Notifications',
  //   icon: 'bell',
  //   variant: 'solid',
  // },
  // { index: 8, path: 'features-lab', title: 'Features Lab', icon: 'flask' },
];

export const layerNames = {
  alertRules: 'alertRules',
  alertInbox: 'alertInbox',
};

export const STATE_CHANGER_CONFIG = {
  DEFAULT_CRITERIA: 'NAME != null',
  DEFAULT_RESOURCE_NAME: 'ALL_COUNTERPARTYS',
};
