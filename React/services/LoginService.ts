import SessionInfo from '../models/SessionInfo';
import User from '../models/User';
import { Api } from '../core/api';
import { adminUser, reportsUser, user1 } from '../fixtures/loginData';
import DateUtils from '../utils/DateUtils';

class LoginService extends Api {
    constructor() {
        super({});
    }

    login(username: string): Promise<SessionInfo> {
        let loginData = null;

        // TODO: Autenticar usuario
        switch (username) {
            case 'admin':
                loginData = adminUser;
                break;
            case 'audit':
                loginData = reportsUser;
                break;
            case 'user1':
                loginData = user1;
                break;
            default:
                break;
        }

        if (!loginData) {
            throw new Error('El usuario o password es incorrecto');
        }

        return Promise.resolve(loginData).then((loginData) => {
            const FAKE_LOGIN = new SessionInfo(
                DateUtils.toDate(loginData.systemDate),
                new User(loginData.user.username, loginData.user.name),
                loginData.permissions
            );

            return FAKE_LOGIN;
        });
    }
}

export default new LoginService();
