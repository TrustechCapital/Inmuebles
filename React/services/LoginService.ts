import SessionInfo from '../models/SessionInfo';
import User from '../models/User';
import { Api } from '../core/api';
import DateUtils from '../utils/DateUtils';

class LoginService extends Api {
    constructor() {
        super({});
    }

    async login(username: string, password: string = '', fromSso = false): Promise<SessionInfo> {

        if (!fromSso) {
            if(!username.trim() || !password.trim()) {
                throw new Error('El usuario o password es incorrecto');
            } else {
                const loginDataResponse = await this.post('/login.do', { username, password }) as any;
                const loginData = loginDataResponse.data;
                if(!loginData.data.valid) { //use response to validate what to do
                    throw new Error('El usuario o password es incorrecto');
                }                 
            }
        }

        const sessionData = await this.post('/session.do', {}) as any;        
        
        return new SessionInfo(
            DateUtils.toDate(sessionData.data.systemDate),
            new User(sessionData.data.user.username, sessionData.data.user.name),
            sessionData.data.permissions
        );
    }

    async ssoLogin(): Promise<SessionInfo | null> {
        try {
            const ssoLoginResponse = await this.post<any>('/accessData');
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
