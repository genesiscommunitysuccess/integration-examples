import { Auth, BasicAuthInfo } from '@genesislcap/foundation-comms';

const mockLogin = (diContainer: any) => {
  const auth: Auth = diContainer.get(Auth);
  return auth.login({
    type: 'BASIC',
    username: '', // provide login to a user in given environment
    password: '', // provide password to a user in given environment
  } as BasicAuthInfo);
};

export default mockLogin;
