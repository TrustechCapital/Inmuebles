import User from './User';

export type ModulePermission = {
    name: string;
    canView: boolean;
    canEdit: boolean;
};

class SessionInfo {
    systemDate: Date;
    user: User;
    permissions: ModulePermission[];

    constructor(systemDate: Date, user: User, permissions: ModulePermission[]) {
        this.systemDate = systemDate;
        this.user = user;
        this.permissions = permissions;
    }
}

export default SessionInfo;
