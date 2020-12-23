import SessionInfo from '../models/SessionInfo';
import User from '../models/User';
import { Api } from '../core/api';
import DateUtils from '../utils/DateUtils';

class LoginService extends Api {
    constructor() {
        super({});
    }

    async login(username: string, password: string = ''): Promise<SessionInfo> {

        if (!username.trim() || !password.trim()) {
            throw new Error('El usuario o password es incorrecto');
        }

        const loginDataResponse = await this.post('/session') as any;
        const loginData = loginDataResponse.data;

        return new SessionInfo(
            DateUtils.toDate(loginData.systemDate),
            new User(loginData.user.username, loginData.user.name),
            loginData.permissions
        );
    }

    async ssoLogin(): Promise<SessionInfo | null> {
        try {
            const ssoLoginResponse = await this.post<any>('http://localhost:8000/accessData');
            const sessionData = ssoLoginResponse.data.responseObj;
            return new SessionInfo(
                new Date(),
                new User(sessionData.userName, sessionData.nombre),
                sessionData.permissions || []
            );    
        } catch (error) {
            return null;    
        } 
    }
}

export default new LoginService();
