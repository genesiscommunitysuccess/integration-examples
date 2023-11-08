import { DI } from '@microsoft/fast-foundation';
import {
  Connect,
  Auth,
  BasicAuthInfo,
} from '@genesislcap/foundation-comms';

import config from '../config';

export default function () {
    const container = DI.getOrCreateDOMContainer();
    const  connect: Connect = container.get(Connect);
    const  auth: Auth = container.get(Auth);

    return {
        run: () => {
            return connect.connect(config.API_URL)
        },
        login: () => {
            return auth.login({
            type: 'BASIC',
            username: config.AUTH_DATA.username,
            password: config.AUTH_DATA.password,
            } as BasicAuthInfo)
        },
        subscribe: (callback: any) => {
            return connect.isConnectedSubject?.subscribe(callback);
        },

    }
}