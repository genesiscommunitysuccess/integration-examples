import { DefaultLayout } from './layouts/default/default.layout';
import { BlankLayout } from './layouts/blank/blank.layout';

export const layoutDefault = 'DefaultLayout';

export const layoutComponentName = {
  default: layoutDefault,
  blank: 'BlankLayout',
};

export const layoutComponentInstanceByName = {
  [layoutComponentName.default]: DefaultLayout,
  [layoutComponentName.blank]: BlankLayout,
};

export const API_DATA = {
  URL: 'wss://public-foundation.genesislab.global/gwf/',
  AUTH: {
    username: 'JohnDoe',
    password: 'Password11*',
  },
};
