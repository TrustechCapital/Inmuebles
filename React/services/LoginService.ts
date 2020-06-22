import SessionInfo from '../models/SessionInfo';
import User from '../models/User';

class LoginService {
    constructor() {}

    login(): Promise<SessionInfo> {
        const FAKE_LOGIN = new SessionInfo(
            new Date(),
            new User('admin', 'Administrador'),
            []
        );

        return Promise.resolve(FAKE_LOGIN);
    }
}

export default new LoginService();
