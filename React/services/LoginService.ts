import SessionInfo from '../models/SessionInfo';
import User from '../models/User';
import { Api } from '../core/api';
import DateUtils from '../utils/DateUtils';

class LoginService extends Api {
    constructor() {
        super({});
    }

    login(username: string, password: string = ''): Promise<SessionInfo> {

        if (!username.trim() || !password.trim()) {
            throw new Error('El usuario o password es incorrecto');
        }

        const loginData = await this.get('/session');

        return new SessionInfo(
            DateUtils.toDate(loginData.systemDate),
            new User(loginData.user.username, loginData.user.name),
            loginData.permissions
        );
    }
}
