import SessionInfo from '../models/SessionInfo';
import User from '../models/User';
import { Api } from '../core/api';
import DateUtils from '../utils/DateUtils';

class GoogleInfo {
    constructor() {
        this.appToken = '';
    }
    appToken: string
}

class LoginService extends Api {
    constructor() {
        super({});
    }

    async login(username: string, password: string = ''): Promise<SessionInfo> {

        if (!username.trim() || !password.trim()) {
            throw new Error('El usuario o password es incorrecto');
        }

        return this.post('/session.do').then((body: any) => {
            const loginData = body.data;
            return Promise.resolve(new SessionInfo(
                DateUtils.toDate(loginData.systemDate),
                new User(loginData.user.username, loginData.user.name),
                loginData.permissions
            ));
        });
    }

    async getAppId(): Promise<string> {
        return this.post('/appToken.do').then((body: any) => {
            return body.appToken;
        });
    }

    async googleLogin(googleResponse: any): Promise<SessionInfo> {
        //googleId: string, tokenId: string, accessToken: string, tokenObj: object, profileObj: object
        return this.post('/appToken.do').then((body: any) => {
            return body.appToken;
        });
    }
}

export default new LoginService(); 
