import { Auth, BasicAuthInfo } from '@genesislcap/foundation-comms';

import { API_DATA } from '../config';

const mockLogin = (diContainer: any) => {
  const auth: Auth = diContainer.get(Auth);
  console.log({ auth })
  return auth.login({
    type: 'BASIC',
    username: API_DATA.AUTH.username,
    password: API_DATA.AUTH.password,
  } as BasicAuthInfo);
};

export default mockLogin;
