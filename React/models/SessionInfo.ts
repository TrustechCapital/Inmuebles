import User from './User';

type Permissions = {
    menu: {
        name: string;
        canView: boolean;
        canEdit: boolean;
    };
};

class SessionInfo {
    systemDate: Date;
    user: User;
    permissions: Permissions[];

    constructor(systemDate: Date, user: User, permissions: Permissions[]) {
        this.systemDate = systemDate;
        this.user = user;
        this.permissions = permissions;
    }
}

export default SessionInfo;
