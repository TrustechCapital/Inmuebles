import SessionInfo, { ModulePermission } from '../models/SessionInfo';

const SESSION_INFO_KEY = 'sessionInfo';

class SessionService {
    sessionInfo: SessionInfo | null = null;
    permissionsMap = new Map<string, ModulePermission>();
    constructor() {}

    get() {
        const persistedSessionInfo = sessionStorage.getItem(SESSION_INFO_KEY);

        if (persistedSessionInfo) {
            this.sessionInfo = JSON.parse(persistedSessionInfo);
            this.createPermissionsMapping();
        }

        return {
            sessionInfo: this.sessionInfo,
            permissionsMap: this.permissionsMap,
        };
    }

    create(sessionInfo: SessionInfo) {
        sessionStorage.setItem(SESSION_INFO_KEY, JSON.stringify(sessionInfo));
    }

    delete() {
        sessionStorage.removeItem(SESSION_INFO_KEY);
    }

    createPermissionsMapping() {
        this.permissionsMap = new Map<string, ModulePermission>();

        if (this.sessionInfo) {
            this.sessionInfo.permissions.forEach((permission) => {
                this.permissionsMap.set(permission.name, permission);
            });
        }
    }
}

export default new SessionService();
