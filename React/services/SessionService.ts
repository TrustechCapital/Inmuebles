import SessionInfo, { ModulePermission } from '../models/SessionInfo';

const SESSION_INFO_KEY = 'sessionInfo';

class SessionService {
    constructor() {}

    get() {
        const sessionInfo = sessionStorage.getItem(SESSION_INFO_KEY);
        return sessionInfo ? JSON.parse(sessionInfo) : sessionInfo;
    }

    create(sessionInfo: SessionInfo) {
        sessionStorage.setItem(SESSION_INFO_KEY, JSON.stringify(sessionInfo));
    }

    delete() {
        sessionStorage.removeItem(SESSION_INFO_KEY);
    }

    createPermissionsMapping(sessionInfo: SessionInfo) {
        let permissionsMap = new Map<string, ModulePermission>();

        sessionInfo.permissions.forEach((permission) => {
            permissionsMap.set(permission.name, permission);
        });

        return permissionsMap;
    }
}

export default new SessionService();
