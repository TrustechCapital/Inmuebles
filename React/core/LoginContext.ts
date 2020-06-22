import { createContext } from 'react';
import SessionInfo from '../models/SessionInfo';

export type SessionInfoContextProps = {
    sessionInfo: SessionInfo | null;
    onLogout: () => void;
};

export const SessionInfoContext = createContext<SessionInfoContextProps>({
    sessionInfo: null,
    onLogout: () => {},
});
