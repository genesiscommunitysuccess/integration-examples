import { DI } from '@microsoft/fast-foundation';
import {
  Connect,
  Auth,
  BasicAuthInfo,
} from '@genesislcap/foundation-comms';

import { API_DATA } from '../config';

const mockLogin = () => {
  const container = DI.getOrCreateDOMContainer();
  const connect: Connect = container.get(Connect);
  const auth: Auth = container.get(Auth);

  return connect.connect(API_DATA.URL).then((connected) => {
    return auth.login({
      type: 'BASIC',
      username: API_DATA.AUTH.username,
      password: API_DATA.AUTH.password,
      } as BasicAuthInfo)
  })
}

export default mockLogin;