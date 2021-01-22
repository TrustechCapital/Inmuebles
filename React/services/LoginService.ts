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
        var sessionInfo = this.getData(sessionData.data);

        return new SessionInfo(
            DateUtils.toDate(sessionInfo.systemDate),
            new User(sessionInfo.user.username, sessionInfo.user.name),
            sessionInfo.permissions
        );
    }

    async ssoLogin(): Promise<SessionInfo | null> {
        try {
            const ssoLoginResponse = await this.post<any>('/accessData');
            var sessionInfo = this.getData(ssoLoginResponse.data);
            const sessionData = sessionInfo.responseObj;
            return new SessionInfo(
                new Date(),
                new User(sessionData.userName, sessionData.nombre),
                sessionData.permissions || []
            );    
        } catch (error) {
            return null;    
        } 
    }

    getData(fwData:any): any {
        var CryptoJS = require("crypto-js");
        var rawData = CryptoJS.enc.Base64.parse(fwData);
        var key = CryptoJS.enc.Latin1.parse("eDrtRV4$345C%&7#");
        var iv = CryptoJS.enc.Latin1.parse("FiduciaWebBaNR3g");
        var plainTextData = CryptoJS.AES.decrypt({ ciphertext: rawData }, key, { iv: iv });
        var plainText = plainTextData.toString(CryptoJS.enc.Latin1);
        return JSON.parse(plainText);
    }
}

export default new LoginService();
