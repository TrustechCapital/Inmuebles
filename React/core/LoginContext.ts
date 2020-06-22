import { createContext } from 'react';
import SessionInfo from '../models/SessionInfo';

export type SessionInfoContextProps = {
    sessionInfo: SessionInfo | null;
};

export const SessionInfoContext = createContext<SessionInfoContextProps>({
    sessionInfo: null,
});
