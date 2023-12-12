import type { MainMenu } from './types/menu';

export const layoutComponentName = {
  default: 'DefaultLayoutComponent',
  blank: 'BlankLayoutComponent',
};

export const layoutComponentImportsByName = {
  [layoutComponentName.default]: () =>
    import('./layouts/default/default.layout').then((m) => m.DefaultLayoutComponent),
  [layoutComponentName.blank]: () =>
    import('./layouts/blank/blank.layout').then((m) => m.BlankLayoutComponent),
};

export const API_DATA = {
  URL: 'wss://public-foundation.genesislab.global/gwf/',
  AUTH: {
    username: 'JohnDoe',
    password: 'Password11*',
  },
};

export const mainMenu: MainMenu = [
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

export const layerNames = {
  alertRules: 'alertRules',
  alertInbox: 'alertInbox',
};

export const STATE_CHANGER_CONFIG = {
  DEFAULT_CRITERIA: 'NAME != null',
  DEFAULT_RESOURCE_NAME: 'ALL_COUNTERPARTYS',
};
