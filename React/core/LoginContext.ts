import { createContext } from 'react';
import SessionInfo, { ModulePermission } from '../models/SessionInfo';

export type SessionInfoContextProps = {
    sessionInfo: SessionInfo | null;
    modulePermissionsMap: Map<string, ModulePermission> | null;
    onLogout: () => void;
};

export const SessionInfoContext = createContext<SessionInfoContextProps>({
    sessionInfo: null,
    modulePermissionsMap: null,
    onLogout: () => {},
});
